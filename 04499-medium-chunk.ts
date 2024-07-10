// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

// ============= Your Code Here =============
type ReachLimit<T extends unknown[] | never, V extends number> = [T] extends [
  never
]
  ? true
  : T["length"] extends V
  ? true
  : false;
type GetLast<T extends unknown[][]> = T extends [...infer _, infer L]
  ? L
  : never;
type AppendLast<T extends unknown[][], V> = T extends [
  ...infer Rest,
  infer L extends unknown[]
]
  ? [...Rest, [...L, V]]
  : never;
type _Chunk<
  T extends unknown[],
  U extends number,
  Output extends unknown[][]
> = T extends [infer F, ...infer Rest]
  ? ReachLimit<GetLast<Output>, U> extends true
    ? _Chunk<Rest, U, [...Output, [F]]>
    : _Chunk<Rest, U, AppendLast<Output, F>>
  : Output;

type Chunk<T extends unknown[], U extends number> = _Chunk<T, U, []>;

// type F2 = F<[1, 2, 3]>;
