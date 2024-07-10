// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>
];

// ============= Your Code Here =============

//降低嵌套可以增加执行效率
type NumberToArray<
  T extends number,
  U extends unknown[] = []
> = T extends U["length"] ? U : NumberToArray<T, [1, ...U]>;

type Pop<T extends unknown[]> = T extends [...infer Rest, infer _] ? Rest : [];

type _Triangular<T extends unknown[]> = T["length"] extends 0
  ? []
  : [...T, ..._Triangular<Pop<T>>];

type Triangular<N extends number> = _Triangular<NumberToArray<N>>["length"];
