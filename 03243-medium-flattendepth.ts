// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { MinusOne } from "./02257-medium-minusone";
type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];

// ============= Your Code Here =============
type FlattenDepth<T extends any[], Nested extends number = 1> = Nested extends 0
  ? T
  : T extends [infer F, ...infer Rest]
  ? F extends any[]
    ? [...FlattenDepth<F, MinusOne<Nested>>, ...FlattenDepth<Rest, Nested>]
    : [F, ...FlattenDepth<Rest, Nested>]
  : [];
type M = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>;

[1, 2, 3, 4, [5]];
