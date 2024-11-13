import * as z from "zod";
import {ChatRequestSchema} from "@/types"


export function caller(): string {
  const err = new Error();
  return /\/api([^.])*/.exec(err.stack!.split("\n")[2])?.[0]!;
}



//export type InputSchema<Config extends FlowConfig> = Config["input"] extends { schema: infer ZType extends z.ZodAny ? z.infer<ZType> : any}

//export function defineFlow<I extends any = z.infer<typeof config?.input?.schema?>, Config
