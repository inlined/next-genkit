// fixes caller() method because it runs before turbopack joins files.

import { CallableFlow, StreamableFlow } from "genkit";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
export * from "./connectGenkitUI";

type FlowInput<F> =
  F extends CallableFlow<infer Input, any>
  ?  z.infer<Input>
  : F extends StreamableFlow<infer Input, any, any>
  ? z.infer<Input>
  : never;
// Manually insert null which can happen from a Flow.
type FlowOutput<F> = F extends CallableFlow<any, infer Output>
  ? z.infer<Output>
  : F extends StreamableFlow<any, infer Output, any>
  ? z.infer<Output>
  : never;
type FlowStream<F> = F extends StreamableFlow<any, any, infer S> ? z.infer<S> : never;

const apiRouteRegexp = /\/api\/.*?(?=\/route|:|$)/

async function* noopStream() {}

// TODO: rewrite. The helper function doesn't work in prod so we need an appRoute(flow), pagesRoute(flow)
// for server-side as well as a call() and stream() method for client-side.
export function routeHandler<Flow extends AnyFlow>(flow: Flow) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const resp = flow(await req.json());

    let stream = "stream" in resp ? resp.stream : noopStream();
    let output = resp instanceof Promise ? resp : resp.output;

    if (req.headers.get("accept") !== "text/event-stream") {
      try {
        return NextResponse.json({result: await output});
      } catch (error) {
        return NextResponse.json({error})
      }
    }

    const encoder = new TextEncoder();
    const { readable, writable } = new TransformStream();
    (async () => {
      const writer = writable.getWriter();
      try {
        for await (const chunk of stream) {
          process.stdout.write("Writing chunk " + chunk + "\n");
          await writer.write(new TextEncoder().encode("data: " + JSON.stringify(chunk) + "\n\n"))
        }
      } catch (err) {
        // Failures mid-stream use sse errors. Failures in the final result produce callable errors
        process.stderr.write("Writing error:" + String(err) + "\n");
        writer.write(encoder.encode(`error: ${err}` + "\n\n"));
        await writer.write(encoder.encode("END"));
        return new NextResponse(readable, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Transfer-Encoding": "chunked",
          },
        });
      }

      try {
        process.stdout.write("Got output" + await output + "\n");
        writer.write(encoder.encode(`data: {"result": ${JSON.stringify(await output)}}` + "\n\n"));
        await writer.write(encoder.encode("END"));
      } catch (err) {
        writer.write(encoder.encode(`data: {"error": ${JSON.stringify(String(err))}}` + "\n\n"))
        await writer.write(encoder.encode("END"));
      } finally {
        writer.close();
      }
    })();

    return new NextResponse(readable, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  }
}

interface CallFlowOpts {
  path: string;
  method?: "POST" | "PUT";
}

type AnyFlow = CallableFlow<any, any> | StreamableFlow<any, any, any>;

export async function callFlow<Flow extends AnyFlow = AnyFlow>(path: string, input: FlowInput<Flow>): Promise<FlowOutput<Flow>>;
export async function callFlow<Flow extends AnyFlow = AnyFlow>(opts: CallFlowOpts, input: FlowInput<Flow>): Promise<FlowOutput<Flow>>;

export async function callFlow<Flow extends AnyFlow = AnyFlow>(pathOrOpts: string | CallFlowOpts, input: FlowInput<Flow>):  Promise<FlowOutput<Flow>> {
  let path: string;
  let method: CallFlowOpts["method"];

  if (typeof pathOrOpts === "string") {
    path = pathOrOpts;
    method = "POST";
  } else {
    path = pathOrOpts.path;
    method = pathOrOpts.method ?? "POST";
  }

  const res = await fetch(path, {
    body: JSON.stringify(input),
    method,
  });

  const body = await res.text();
  const resp = JSON.parse(body)
  if (resp["error"]) {
    throw new Error(resp["error"]);
  } else {
    return resp["result"];
  }
}

interface StreamResults<Flow extends AnyFlow> {
  stream: AsyncGenerator<FlowStream<Flow>, FlowStream<Flow> | null, void>;
  output: Promise<FlowOutput<Flow> | null>;
}

export class SSEError extends Error {
  SSEError(message: string) {
    Error(message);
  }
}

// FML. EventSource assumes GET but that makes it hard/non-standard to pass a body (you'd have to do a query string and every framework has their own implementaiton.
// It's very verbose and eventually you'll start hitting routers' path limit. It also makes no sense to not support POST because that's what you should use for a non-idempotent
// function...)
export function streamFlow<Flow extends AnyFlow = AnyFlow>(path: string, input: FlowInput<Flow>): StreamResults<Flow>;
export function streamFlow<Flow extends AnyFlow = AnyFlow>(opts: CallFlowOpts, input: FlowInput<Flow>): StreamResults<Flow>;
export function streamFlow<Flow extends AnyFlow = AnyFlow>(pathOrOpts: string | CallFlowOpts, input: FlowInput<Flow>): StreamResults<Flow> {
  let path: string;
  let method: CallFlowOpts["method"];

  if (typeof pathOrOpts === "string") {
    path = pathOrOpts;
    method = "POST";
  } else {
    path = pathOrOpts.path;
    method = pathOrOpts.method ?? "POST";
  }

  const resp = fetch(path, {
    method,
    headers: {
      "content-type": "application/json",
      "accept": "text/event-stream",
    },
    body: JSON.stringify(input),
  });

  // N.B. To avoid double awaiting output, we stream and resolve/reject a promise within
  // the stream
  let resolveOutput: (o: FlowOutput<Flow> | null) => void;
  let rejectOutput: (err: any) => void;
  const output = new Promise<FlowOutput<Flow> | null>((resolve, reject) => { resolveOutput = resolve; rejectOutput = reject; });

  function decodeSSE(line: string): string {
    if (line.startsWith("error:")) {
      throw new SSEError(line.slice("error:".length).trim());
    }
    if (line.startsWith("data:")) {
      return line.slice("data:".length).trim();
    }
    throw new SSEError(`Unexpected SSE response: ${line}`);
  }

  const streamResults = async function*(): StreamResults<Flow>["stream"] {
    let buffer = "";
    let afterFetch: Response;
    try {
      afterFetch = await resp;
    } catch(err) {
      rejectOutput(err);
      throw err;
    }
    if (!afterFetch.body) {
      rejectOutput(new SSEError("No body"));
      return null;
    }
    const reader = afterFetch.body.getReader();
    const decoder = new TextDecoder();
    let prevMessage: string | null = null;
    try {
      while (true) {
        const read = await reader?.read();
        if (!read) {
          break;
        }

        buffer += decoder.decode(read.value, { stream: true });

        let lines = buffer.split("\n\n");
        buffer = lines.pop() || '';

        for (const line of lines) {
          const message = decodeSSE(line);
          if (message === "END") {
            break;
          }
          if (prevMessage) {
            yield JSON.parse(prevMessage);
          }
          prevMessage = message;
        }

        if (buffer === "END") {
          reader.cancel();
          break;
        }
      }
    } catch (err) {
      throw new SSEError(err ? String(err) : "Unknown Error");
    }

    if (buffer !== "END") {
      const lastLine = decodeSSE(buffer);
      console.warn("Unexpected end of stream in SSE steram");
      if (prevMessage) {
        yield JSON.parse(prevMessage);
        try {
          yield JSON.parse(lastLine);
        } catch (err) {
          console.error("SSE terminated with partial response", lastLine);
        }
      }
      resolveOutput(null);
      return null;
    }

    if (!prevMessage) {
      console.warn("Unexpected empty stream in SSE steram");
      resolveOutput!(null);
      return null;
    }

    const final = JSON.parse(prevMessage) as { data: FlowOutput<Flow> } | { error: any };
    if ("error" in final) {
        rejectOutput!(new Error(String(final.error)));
        throw new Error(String(final.error));
    }
    resolveOutput!(final.data);
    return final.data;
  }

  return {
    stream: streamResults(),
    // There's some type coercion necessary here because FlowOutput always extends promise but doesn't
    // document itself as such, so even if I did new Promise<NoPromise<FlowOutput>> it would still not be the
    // same type as FlowOutput.
    output: output,
  }
}

