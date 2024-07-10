// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<UnionToIntersection<"foo" | 42 | true>, "foo" & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => "foo") | ((i: 42) => true)>,
      (() => "foo") & ((i: 42) => true)
    >
  >
];

// ============= Your Code Here =============
type Permutation<T, K = T> =
  //解决Exclude<T,K>T=K时产生的never
  [T] extends [never]
    ? []
    : //通过分发设置K
    K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;
type ToIntersection<T extends any[]> = T extends [infer F, ...infer Rest]
  ? F & ToIntersection<Rest>
  : unknown;

type UnionToIntersection<U> = ToIntersection<Permutation<U>>;
type E = UnionToIntersection<(() => "foo") | ((i: 42) => true)>;
// type F = ToIntersection<
//   [() => "foo", (i: 42) => true] | [() => "foo", (i: 42) => true]
// >;

// type E2 = "a" | never;
