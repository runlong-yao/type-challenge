// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<CheckRepeatedChars<"abc">, false>>,
  Expect<Equal<CheckRepeatedChars<"abb">, true>>,
  Expect<Equal<CheckRepeatedChars<"cbc">, true>>,
  Expect<Equal<CheckRepeatedChars<"">, false>>
];

// ============= Your Code Here =============
type IsRepeat<
  T extends string,
  S extends string
> = S extends `${infer _}${T}${infer _}` ? true : false;

type Test = IsRepeat<"a", "cb">;
type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer Rest}`
  ? IsRepeat<F, Rest> extends true
    ? true
    : CheckRepeatedChars<Rest>
  : false;
