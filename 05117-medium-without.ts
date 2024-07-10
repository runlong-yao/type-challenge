// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

// ============= Your Code Here =============
type isEqual<T, V> = (<E>() => E extends T ? 1 : 2) extends <E>() => E extends V
  ? 1
  : 2
  ? true
  : false;

type Exclude<T extends any[], U> = T extends [infer F, ...infer Rest]
  ? isEqual<F, U> extends true
    ? Exclude<Rest, U>
    : [F, ...Exclude<Rest, U>]
  : [];

type Without<T extends any[], U extends any> = U extends [
  infer F,
  ...infer Rest
]
  ? Rest extends []
    ? Without<T, F>
    : Without<Without<T, F>, Rest>
  : Exclude<T, U>;
