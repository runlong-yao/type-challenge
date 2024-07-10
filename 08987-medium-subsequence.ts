// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<
    Equal<
      Subsequence<[1, 2, 3]>,
      [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
    >
  >
];

type F = [1] | [1, 2] | [1, 3] | [1, 2, 3] | [2, 3];

type _Subsequence<T extends any[]> = T extends [infer F, ...infer Rest]
  ? T | [F] | Rest | _Subsequence<Rest>
  : never;

type T = _Subsequence<[1, 2, 3]>;

// ============= Your Code Here =============
// type _Subsequence<T extends any[]> = T extends [infer F, ...infer Rest]?
type Subsequence<T extends any[]> = _Subsequence<T>;
