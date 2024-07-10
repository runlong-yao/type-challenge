// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsPalindrome<"abc">, false>>,
  Expect<Equal<IsPalindrome<"b">, true>>,
  Expect<Equal<IsPalindrome<"abca">, false>>,
  Expect<Equal<IsPalindrome<"abba">, true>>,
  Expect<Equal<IsPalindrome<"abcba">, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<2332>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>
];

// ============= Your Code Here =============
type ToString<T extends number | string> = T extends number ? `${T}` : T;
type IsPalindrome<T extends number | string> =
  ToString<T> extends `${infer F}${infer Rest}`
    ? Rest extends ""
      ? true
      : Rest extends `${infer Rest2}${F}`
      ? IsPalindrome<Rest2>
      : false
    : true;
