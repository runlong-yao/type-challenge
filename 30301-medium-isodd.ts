// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<number>, false>>
];

// ============= Your Code Here =============
type _IsOdd<T extends string | never> = [T] extends [never]
  ? false
  : T extends `${infer Rest}${3 | 5 | 7 | 9}`
  ? true
  : false;
type IsOdd<T extends number> = T extends number ? _IsOdd<`${T}`> : never;
