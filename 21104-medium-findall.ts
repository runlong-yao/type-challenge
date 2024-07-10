// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<FindAll<"Collection of TypeScript type challenges", "Type">, [14]>
  >,
  Expect<
    Equal<FindAll<"Collection of TypeScript type challenges", "pe">, [16, 27]>
  >,
  Expect<Equal<FindAll<"Collection of TypeScript type challenges", "">, []>>,
  Expect<Equal<FindAll<"", "Type">, []>>,
  Expect<Equal<FindAll<"", "">, []>>,
  Expect<Equal<FindAll<"AAAA", "A">, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<"AAAA", "AA">, [0, 1, 2]>>
];

// ============= Your Code Here =============
type FindAll<
  T extends string,
  P extends string,
  Prefix extends string = ""
> = P extends ""
  ? []
  : T extends `${Prefix}${infer U}${P}${infer _}`
  ? [
      toArray<`${Prefix}${U}`>["length"],
      ...FindAll<T, P, `${Prefix}${U}${FirstChar<P>}`>
    ]
  : [];
// : T extends `${Prefix}${infer U}${P}`
// ? [toArray<`${Prefix}${U}`>["length"]]
// : [];
type E = FindAll<"Collection of TypeScript type challenges", "">;
type F = FindAll<"AAAA", "AA">;
type U = FindAll<"AAAA", "A">;

type toArray<T extends string> = T extends `${infer F}${infer Rest}`
  ? [F, ...toArray<Rest>]
  : [];

type FirstChar<T> = T extends `${infer F}${infer _}` ? F : T;
