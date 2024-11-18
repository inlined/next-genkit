import * as z from 'zod';

type RequiredFields<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalFields<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? K : never;
}[keyof T];

type IsUnion<T, Original = T> =
  T extends Original
  ? [Original] extends [T]
    ? never
    : T
  : never;

// TODO: Can this handle more types like enums, tuples, etc? Does it matter?
type TypeToZod<T> =
  // Noops for reverse compatibility.
  // FML. Zod types don't actually have inheritance so they have to be copied manually
  T extends z.ZodString
  ? z.ZodString
  : T extends z.ZodNumber
  ? z.ZodNumber
  : T extends z.ZodEnum<infer E>
  ? z.ZodEnum<E>
  : T extends z.ZodArray<infer E>
  ? z.ZodArray<E>
  : T extends z.ZodTuple<infer E>
  ? z.ZodTuple<E>
  : T extends z.ZodObject<infer O>
  ? z.ZodObject<O>
  : T extends z.ZodNull
  ? z.ZodNull
  : T extends z.ZodUndefined
  ? z.ZodUndefined
  : T extends z.ZodAny
  ? z.ZodAny

  // Native types
  : T extends IsUnion<T>
  // Note: type loss
  ? z.ZodUnion<[z.ZodTypeAny, ...z.ZodTypeAny[]]>
  : T extends string
    ? string extends T
      ? z.ZodString
      // Note: type lossiness here
      : z.ZodEnum<[string, ...string[]]>
  : T extends number
  ? z.ZodNumber
  : T extends boolean
  ? z.ZodBoolean
  : T extends null
  ? z.ZodNull
  : T extends undefined
  ? z.ZodUndefined
  : T extends Array<infer E>
  ? z.ZodArray<TypeToZod<E>>
  : never;

// statically compiled tests:

/*
function matchesSchema<RawType>(i: TypeToZod<RawType>): void {}

matchesSchema<z.ZodString>(z.string());
matchesSchema<z.ZodNumber>(z.number());
matchesSchema<z.ZodNull>(z.null());
matchesSchema<z.ZodUndefined>(z.undefined());
matchesSchema<z.ZodEnum<["hello", "world"]>>(z.enum(["hello", "world"]);
matchesSchema<string>(z.string());
matchesSchema<number>(z.number());
matchesSchema<boolean>(z.boolean());
matchesSchema<null>(z.null());
matchesSchema<undefined>(z.undefined());
matchesSchema<"a" | "b">(z.enum(["a", "b"]));
matchesSchema<string[]>(z.array(z.string()));
*/
// Working:
/*
assertImplements<TypeToZod<5>, z.ZodNumber>();
assertImplements<TypeToZod<"hi">, z.ZodString>();
assertImplements<TypeToZod<true>, z.ZodBoolean>();
assertImplements<TypeToZod<["a", "B"], z.ZodTuple<[z.ZodString], null>>
assertImplements<TypeToZod<{hello: "world"}>, typeof z.object({hello: z.string()})>();


// To fix:
// let test: TypeToZod<typeof tuple> = z.tuple(["a", "b"])
// assertImplements<TypeToZod<{hello: "world"}>, typeof z.object({ hello: z.string() })>;
  /*
  : string extends T
  // Unfortunately Zod doesn't have a type for string literals and literal & string is string
  ? z.ZodEnum<[string]>
  : T extends [...infer Tuple]
  ? z.ZodTuple<[{ [K in keyof Tuple & number]: TypeToZod<Tuple[K]> }[keyof Tuple & number]]>
  : T extends Array<infer U>
  ? z.ZodArray<TypeToZod<U>>
  : T extends object
  // This is somewhat black magic to copy required or not across objects
  ? z.ZodObject<
    { [K in OptionalFields<T>]?: TypeToZod<T[K]> }
    &
    { [K in RequiredFields<T>]: TypeToZod<T[K]>}
  >
  */
/*
const literal: "literal" = "literal";
assertImplements<TypeToZod<typeof literal>, typeof z.enum([literal])>();
*/

// TODO: Work in progress to make the callback only nullable if the input type is nullable.
/*
export type MaybeNullableInput<Input, Config extends FlowConfig> = Config["output"] extends null | undefined 
 ? Input | undefined
 : Config["output"] extends { "schema": null | undefined }
? Input | undefined : Input;
*/

// Tests: