// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<
    Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[0, "", false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============

type NotEmpty<T> = T extends "" | 0 | false | undefined | null
  ? false
  : T extends any[]
  ? ArrayNotEmpty<T>
  : T extends object
  ? ObjectNotEmpty<T>
  : true;
type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer Rest]
  ? NotEmpty<F> extends true
    ? true
    : AnyOf<Rest>
  : false;

type ArrayNotEmpty<T extends any[]> = T["length"] extends 0 ? false : true;

type ObjectNotEmpty<T extends object> = keyof T extends never ? false : true;
