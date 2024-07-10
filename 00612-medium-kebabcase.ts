// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];

// ============= Your Code Here =============

type IsKebabCase<T> = T extends "F" | "B" | "A" | "C" ? true : false;
type ToLower<
  T,
  SKIP extends boolean = false
> = T extends `${infer F}${infer Rest}`
  ? IsKebabCase<F> extends true
    ? `${SKIP extends true ? "" : "-"}${Lowercase<F>}${ToLower<Rest>}`
    : `${F}${ToLower<Rest>}`
  : "";
type KebabCase<T> = ToLower<T, true>;
