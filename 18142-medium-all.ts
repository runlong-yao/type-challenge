// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<["1", "1", "1"], "1">, true>>,
  Expect<Equal<All<["1", "1", "1"], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
  Expect<Equal<All<[never], never>, true>>,
  Expect<Equal<All<[any], any>, true>>,
  Expect<Equal<All<[unknown], unknown>, true>>,
  Expect<Equal<All<[any], unknown>, false>>,
  Expect<Equal<All<[unknown], any>, false>>,
  Expect<Equal<All<[1, 1, 2], 1 | 2>, false>>
];

//[Note]判断类型是否相同的最细方式
type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U
  ? 1
  : 2
  ? true
  : false;
//[Note]判断是否是never
type IsNever<T> = [T] extends [never] ? true : false;

// ============= Your Code Here =============
type All<T extends any[], U> = T extends [infer F, ...infer Rest]
  ? IsEqual<F, U> extends true
    ? All<Rest, U>
    : false
  : true;
