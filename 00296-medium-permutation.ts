// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];

// ============= Your Code Here =============
//通过分发产生或
type Permutation<T, K = T> =
  //解决Exclude<T,K>T=K时产生的never
  [T] extends [never]
    ? []
    : //通过分发设置K
    K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never;

type ToTuple<T, M = T> = [T] extends [never]
  ? []
  : M extends M
  ? [M, ...ToTuple<Exclude<T, M>>]
  : never;
type E = ToTuple<"1" | "2" | "3">;

type E2 = Exclude<"1" | "2", "1" | "2">;
