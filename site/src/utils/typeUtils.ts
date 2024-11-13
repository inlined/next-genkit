import * as z from 'zod';

// TODO: Can this handle more types like enums, tuples, etc? Does it matter?
type TypeToZod<T> =
  T extends z.ZodAny
  ? T
  : string extends T
  ? z.ZodEnum<[string & T]>
  : T extends string
  ? z.ZodString
  : T extends number
  ? z.ZodNumber
  : T extends boolean
  ? z.ZodBoolean
  : T extends [...infer Tuple]
  ? z.ZodTuple<[{ [K in keyof Tuple]: TypeToZod<Tuple[K]> }[keyof Tuple]]>
  : T extends Array<infer U>
  ? z.ZodArray<TypeToZod<U>>
  : T extends object
  ? z.ZodObject<{ [K in keyof T]: TypeToZod<T[K]> }>
  : z.ZodAny

  /*
export type MaybeNullableInput<Input, Config extends FlowConfig> = Config["output"] extends null | undefined 
 ? Input | undefined
 : Config["output"] extends { "schema": null | undefined }
? Input | undefined : Input;
*/