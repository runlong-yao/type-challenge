// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, "a", number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, "a", any, 1], any>, 5>>
];

// ============= Your Code Here =============

type isEqual<T, U> = (<V>() => V extends U ? 1 : 2) extends <V>() => V extends T
  ? 1
  : 2
  ? true
  : false;

type LastIndexOf<T, U> = T extends [...infer Rest, infer L]
  ? isEqual<L, U> extends true
    ? Rest["length"]
    : LastIndexOf<Rest, U>
  : -1;

// type Test<T extends any[]> = T["length"] extends 5 ? T : never;

// type F = Test<[1, 2, 3, 4, 5]>;

// type isEqual<T, U> = (<V>() => V extends U ? 1 : 2) extends <V>() => V extends T
//   ? 1
//   : 2
//   ? true
//   : false;
// type GetOffsetArray<T, U> = T extends [infer F, ...infer Rest]
//   ? isEqual<F, U> extends true
//     ? []
//     : [F, ...GetOffsetArray<Rest, U>]
//   : [];

// type IF<T, U, TRUE_ELSE, FALSE_ELSE> = isEqual<T, U> extends true
//   ? TRUE_ELSE
//   : FALSE_ELSE;

// export type IndexOf<T extends any[], U> = IF<
//   GetOffsetArray<T, U>["length"],
//   T["length"],
//   -1,
//   GetOffsetArray<T, U>["length"]
// >;
