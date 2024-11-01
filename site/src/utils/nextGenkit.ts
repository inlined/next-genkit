import * as z from "zod";
import {ChatRequestSchema} from "@/types"


export function caller(): string {
  const err = new Error();
  return /\/api([^.])*/.exec(err.stack!.split("\n")[2])?.[0]!;
}

// TODO: Can this handle more types like enums, tuples, etc? Does it matter?
type TypeToZod<T> = 
  T extends string
  ? z.ZodString
  : T extends number
  ? z.ZodNumber
  : T extends boolean
  ? z.ZodBoolean
  : T extends Array<infer U>
  ? z.ZodArray<TypeToZod<U>>
  : T extends object
  ? z.ZodObject<{ [K in keyof T]: TypeToZod<T[K]> }>
  : any;

export interface FlowConfig<Input = any, Output = any> {
  input?: {
    schema?: TypeToZod<Input>
    default?: Input
  },
  output?: {
    schema?: TypeToZod<Output>
  },
};

export type MaybeNullableInput<Input, Config extends FlowConfig> = Config["output"] extends null | undefined 
 ? Input | undefined
 : Config["output"] extends { "schema": null | undefined }
? Input | undefined : Input;

//export type InputSchema<Config extends FlowConfig> = Config["input"] extends { schema: infer ZType extends z.ZodAny ? z.infer<ZType> : any}

//export function defineFlow<I extends any = z.infer<typeof config?.input?.schema?>, Config
