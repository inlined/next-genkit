// fixes caller() method because it runs before turbopack joins files.

import { CallableFlow, Flow } from "genkit";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
export * from "./connectGenkitUI";

export function caller(skip: number = 0): string {
  // Use server ensures we get the non-bundled filename
  const err = new Error();
  return err.stack!.split("\n")[3 + skip];
}

type FlowInput<F> = F extends CallableFlow<infer Input, any> ? z.infer<Input> : never;
type FlowOutput<F> = F extends CallableFlow<any, infer Output> ? z.infer<Output> : never;

const apiRouteRegexp = /\/api\/.*?(?=\/route|:|$)/

// TODO: rewrite. The helper function doesn't work in prod so we need an appRoute(flow), pagesRoute(flow)
// for server-side as well as a call() and stream() method for client-side.
export function nextApiRoute<Flow extends CallableFlow<any, any>>(flow: Flow) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Try to force the error just to see what happens
      const output = await flow(await req.json());
      return NextResponse.json({result: output});
    } catch (error) {
      console.log("Got error", error);
      return NextResponse.json({error})
    }
  }
}

interface CallFlowOpts {
  path: string;
  method?: "POST" | "GET" | "PUT";
}

type UntypedFlow = CallableFlow<z.ZodAny, z.ZodAny>
export async function callFlow<Flow extends UntypedFlow = UntypedFlow>(path: string, input: FlowInput<Flow>): Promise<FlowOutput<Flow>>;
export async function callFlow<Flow extends UntypedFlow = UntypedFlow>(opts: CallFlowOpts, input: FlowInput<Flow>): Promise<FlowOutput<Flow>>;

export async function callFlow<Flow extends UntypedFlow = UntypedFlow>(pathOrOpts: string | CallFlowOpts, input: FlowInput<Flow>):  Promise<FlowOutput<Flow>> {
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

