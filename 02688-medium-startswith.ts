// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<StartsWith<"abc", "ac">, false>>,
  Expect<Equal<StartsWith<"abc", "ab">, true>>,
  Expect<Equal<StartsWith<"abc", "abc">, true>>,
  Expect<Equal<StartsWith<"abc", "abcd">, false>>,
  Expect<Equal<StartsWith<"abc", "">, true>>,
  Expect<Equal<StartsWith<"abc", " ">, false>>,
  Expect<Equal<StartsWith<"", "">, true>>
];

// ============= Your Code Here =============

type IsEqual<T extends string, U extends string> = T extends U
  ? U extends T
    ? true
    : false
  : false;

export type StartsWith<
  T extends string,
  U extends string
> = U extends `${infer F2}${infer Rest2}`
  ? T extends `${infer F1}${infer Rest1}`
    ? IsEqual<F1, F2> extends true
      ? StartsWith<Rest1, Rest2>
      : false
    : false
  : true;

// type E = "abc";

// type E2 = E["length"];
// type E3 = [1, 2];
// type E4 = E3["length"];
// //如果无法拆成两部分将返回never
// type E5<T extends string> = T extends `${infer F}${infer Rest}` ? Rest : never;
// type E6 = E5<"a">;
