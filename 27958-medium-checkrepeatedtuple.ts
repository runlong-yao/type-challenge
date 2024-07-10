// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>
];

// ============= Your Code Here =============

type IsEqual<T, U> = (<V>() => T extends V ? 1 : 2) extends <V>() => U extends V
  ? 1
  : 2
  ? true
  : false;
type Include<T extends unknown[], V> = T extends [infer F, ...infer Rest]
  ? IsEqual<F, V> extends true
    ? true
    : Include<Rest, V>
  : false;
type CheckRepeatedTuple<T extends unknown[]> = T extends [
  infer F,
  ...infer Rest
]
  ? Include<Rest, F> extends true
    ? true
    : CheckRepeatedTuple<Rest>
  : false;
