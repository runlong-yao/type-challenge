// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<
    Equal<
      MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
      { a: 1 | 2; b: 2; c: 3 }
    >
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>
];

// ============= Your Code Here =============
type Flat<T> = { [key in keyof T]: T[key] };
type Merge<F, S> = Flat<{
  [k in keyof S | keyof F]: S[k & keyof S] | F[k & keyof F];
}>;
type E = Flat<{ a: 1 } | { a: 2 }>;
type MergeAll<XS> = XS extends [infer F, ...infer Rest]
  ? Merge<F, MergeAll<Rest>>
  : {};

//C:{a:1|2}
// type C = { a: 1 } | { a: 2 };
// let c: C = { a: 2 };

//【Note】1|never是1
// type D2 = 1 | never;
