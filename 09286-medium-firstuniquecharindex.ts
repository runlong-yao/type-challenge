// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

// ============= Your Code Here =============

// type IsRepeat<
//   T extends string,
//   S extends string
// > = S extends `${infer _}${T}${infer _}` ? true : false;
// type FirstUniqueCharIndex<T extends string> = T extends `${infer F}${infer Rest}`?IsRepeat<F,Rest>;
