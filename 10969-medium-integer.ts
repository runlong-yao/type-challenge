// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

let x = 1;
let y = 1 as const;

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.0>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>
];

// ============= Your Code Here =============
type ToString<T extends number> = T extends number ? `${T}` : never;
type isEqual<T, V> = (<E>() => E extends T ? 1 : 2) extends <E>() => E extends V
  ? 1
  : 2
  ? true
  : false;
type Integer<T extends number> = isEqual<T, number> extends true
  ? never
  : ToString<T> extends `${infer _}.${infer R}`
  ? R extends "0"
    ? T
    : never
  : T;

type F = Integer<typeof x>;

type M = ToString<typeof x>;
