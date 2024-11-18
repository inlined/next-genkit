import { CallableFlow, Flow } from "genkit";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export function caller(skip: number): string {
  const err = new Error();
  return err.stack!.split("\n")[1 + skip];
}

type FlowInput<F> = F extends CallableFlow<infer Input, any> ? Input : never;
type FlowOutput<F> = F extends CallableFlow<any, infer Output> ? Output : never;

const apiRouteRegexp = /\/api\/.*?(?=\/route|:|$)/

export function nextApiRoute<Flow extends CallableFlow<any, any>>(flow: Flow) {
  const match = apiRouteRegexp.exec(caller(2));
  if (!match) {
    throw new Error("NextApiRoute can only be used inside the /api directory");
  }
  const path = match[0];

  const ret = async (req: NextRequest): Promise<NextResponse> => {
    try {
      const result = await flow(await req.json());
      console.log(`Result is ${result}`);
      return NextResponse.json({result});
    } catch (error) {
      console.log("Got error", error);
      return NextResponse.json({error})
    }
  }

  ret.call = async (input: z.infer<FlowInput<Flow>>, opts: { method: "POST" | "GET" | "PUT" } = { method: "POST" }): Promise<z.infer<FlowOutput<Flow>>> => {
    "use client"
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

// TODO: play with type system to use native types and infer Zod

//export type InputSchema<Config extends FlowConfig> = Config["input"] extends { schema: infer ZType extends z.ZodAny ? z.infer<ZType> : any}

//export function defineFlow<I extends any = z.infer<typeof config?.input?.schema?>, Config
