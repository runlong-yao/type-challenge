// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, "a"], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, "a", any], any>, 4>>,
  Expect<Equal<IndexOf<[string, "a"], "a">, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>
];

// ============= Your Code Here =============
type isEqual<T, U> = (<V>() => V extends U ? 1 : 2) extends <V>() => V extends T
  ? 1
  : 2
  ? true
  : false;
type GetOffsetArray<T, U> = T extends [infer F, ...infer Rest]
  ? isEqual<F, U> extends true
    ? []
    : [F, ...GetOffsetArray<Rest, U>]
  : [];

type IF<T, U, TRUE_ELSE, FALSE_ELSE> = isEqual<T, U> extends true
  ? TRUE_ELSE
  : FALSE_ELSE;

export type IndexOf<T extends any[], U> = IF<
  GetOffsetArray<T, U>["length"],
  T["length"],
  -1,
  GetOffsetArray<T, U>["length"]
>;
