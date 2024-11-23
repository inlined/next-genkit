// fixes caller() method because it runs before turbopack joins files.

import { CallableFlow, Flow, StreamableFlow } from "genkit";
import { NextRequest, NextResponse } from "next/server";
import { writer } from "repl";
import * as z from "zod";
export * from "./connectGenkitUI";

type FlowInput<F> =
  F extends CallableFlow<infer Input, any>
  ?  z.infer<Input>
  : F extends StreamableFlow<infer Input, any, any>
  ? z.infer<Input>
  : never;
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
        console.log("Got error", error);
        return NextResponse.json({error})
      }
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    try {
      for await (const chunk of stream) {
        await writer.write(new TextEncoder().encode("data: " + JSON.stringify(chunk) + "\n\n"))
      }
    } catch (err) {
      // Failures mid-stream use sse errors. Failures in the final result produce callable errors
      writer.write(new TextEncoder().encode(`error: ${err}` + "\n\n"));
      writer.close();
    }

    try {
      writer.write(new TextEncoder().encode("data: " + JSON.stringify(await output)) + "\n\n");
    } catch (err) {
      writer.write(new TextEncoder().encode(`data: {"error": ${JSON.stringify(String(err))}}` + "\n\n"))
    } finally {
      writer.close();
    }
    return new NextResponse(readable, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  }
}

interface CallFlowOpts {
  path: string;
  method?: "POST" | "GET" | "PUT";
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

  console.log("Fetching", path);
  const res = await fetch(path, {
    body: JSON.stringify(input),
    method,
  });
  
  const body = await res.text();
  console.log("Body is", body);
  const resp = JSON.parse(body)
  if (resp["error"]) {
    console.error(`Got error: ${JSON.stringify(resp["error"], null, 2)}`)
    throw new Error(resp["error"]);
  } else {
    return resp["result"];
  }
}

interface StreamResults<Flow extends AnyFlow> {
  stream: AsyncGenerator<FlowStream<Flow>, FlowStream<Flow>, void>;
  output: Promise<FlowOutput<Flow>>;
}

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

  console.log("Fetching", path);
  const eventSource = new EventSource(path);
  let prevMessage: MessageEvent | null = null;
  let resolveOutput: (o: FlowOutput<Flow>) => void;
  let rejectOutput: (err: any) => void;
  const output = new Promise<FlowOutput<Flow>>((resolve, reject) => { resolveOutput = resolve; rejectOutput = reject; });

  return {
    stream: (async function*(): StreamResults<Flow>["stream"] {
      try {
        while (true) {
          const next: MessageEvent = await new Promise((resolve, reject) => {
            eventSource.onmessage = resolve;
            eventSource.onerror = reject;
          });
          if (next.data === "END") {
            break;
          }
          if (prevMessage) {
            yield JSON.parse(prevMessage.data) as FlowStream<Flow>;
          }
          prevMessage = next;
        }
      } catch (err) {
        throw new Error("SSE Error: " + JSON.stringify(err));
      } finally {
        eventSource.close();
      }

      const final = prevMessage!.data as { data: FlowOutput<Flow> } | { error: any };
      if ("error" in final) {
          rejectOutput!(new Error(String(final.error)));
          throw new Error(String(final.error));
      }
      resolveOutput!(final.data);
      return final.data;
    })(),
    // There's some type coercion necessary here because FlowOutput always extends promise but doesn't
    // document itself as such, so even if I did new Promise<NoPromise<FlowOutput>> it would still not be the
    // same type as FlowOutput.
    output: output,
  }
}

