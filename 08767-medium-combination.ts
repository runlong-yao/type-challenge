// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Combination<["foo", "bar", "baz"]>,
      | "foo"
      | "bar"
      | "baz"
      | "foo bar"
      | "foo bar baz"
      | "foo baz"
      | "foo baz bar"
      | "bar foo"
      | "bar foo baz"
      | "bar baz"
      | "bar baz foo"
      | "baz foo"
      | "baz foo bar"
      | "baz bar"
      | "baz bar foo"
    >
  >
];

//等价于生成 ["foo"]|["foo", "bar"]|["foo", "baz"]|["foo", "bar", "baz"]|["foo", "baz", "bar"]
// type _Sub<T extends string, list extends string[]>
type _Combination<T extends string[]> = T extends [
  infer F,
  ...infer Rest extends string[]
]
  ? F | _Combination<Rest>
  : never;

type F = _Combination<["a", "b", "c"]>;

type A = "a" | "ab" | "abc" | "acb";

// ============= Your Code Here =============
type Combination<T extends string[]> = any;
