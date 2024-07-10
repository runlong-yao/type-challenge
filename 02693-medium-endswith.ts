// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { StartsWith } from "./02688-medium-startswith";

type cases = [
  Expect<Equal<EndsWith<"abc", "bc">, true>>,
  Expect<Equal<EndsWith<"abc", "abc">, true>>,
  Expect<Equal<EndsWith<"abc", "d">, false>>,
  Expect<Equal<EndsWith<"abc", "ac">, false>>,
  Expect<Equal<EndsWith<"abc", "">, true>>,
  Expect<Equal<EndsWith<"abc", " ">, false>>
];

// ============= Your Code Here =============
type Reverse<T extends string> = T extends `${infer F}${infer Rest}`
  ? `${Reverse<Rest>}${F}`
  : T;
type EndsWith<T extends string, U extends string> = StartsWith<
  Reverse<T>,
  Reverse<U>
>;
