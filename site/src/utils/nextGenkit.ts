// fixes caller() method because it runs before turbopack joins files.

import { CallableFlow, Flow } from "genkit";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import * as z from "zod";

export function caller(skip: number = 0): string {
  // Use server ensures we get the non-bundled filename
  const err = new Error();
  return err.stack!.split("\n")[3 + skip];
}

type FlowInput<F> = F extends CallableFlow<infer Input, any> ? Input : never;
type FlowOutput<F> = F extends CallableFlow<any, infer Output> ? Output : never;

const apiRouteRegexp = /\/api\/.*?(?=\/route|:|$)/

// TODO: rewrite. The helper function doesn't work in prod so we need an appRoute(flow), pagesRoute(flow)
// for server-side as well as a call() and stream() method for client-side.
export function nextApiRoute<Flow extends CallableFlow<any, any>>(flow: Flow) {
  let path: string;
  const match = apiRouteRegexp.exec(caller());
  if (!match) {
    throw new Error("NextApiRoute can only be used inside the /api directory");
  } else {
    path = match[0];
  }

  const ret = async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Try to force the error just to see what happens
      const result = await flow(await req.json());
      console.log(`Result is ${result}`);
      return NextResponse.json({result});
    } catch (error) {
      console.log("Got error", error);
      return NextResponse.json({error})
    }
  }

  ret.call = async (input: z.infer<FlowInput<Flow>>, opts: { method: "POST" | "GET" | "PUT" } = { method: "POST" }): Promise<z.infer<FlowOutput<Flow>>> => {
    if (!path) {
      throw new Error("Path could not be determined");
    }
    const res = await fetch(path, {
      body: JSON.stringify(input),
      method: opts.method,
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

  return ret;
}

