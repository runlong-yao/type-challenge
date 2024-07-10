// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

// ============= Your Code Here =============
type LengthOfString<S extends string> = ToTuple<S>["length"];

type ToTuple<S extends string> = S extends `${infer T}${infer R}`
  ? R extends ""
    ? [T]
    : [T, ...ToTuple<R>]
  : //兼容''
  S extends ""
  ? []
  : [S];

type E = ToTuple<"">;
type E2 = LengthOfString<"">;
