// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Join<["a", "p", "p", "l", "e"], "-">, "a-p-p-l-e">>,
  Expect<Equal<Join<["Hello", "World"], " ">, "Hello World">>,
  Expect<Equal<Join<["2", "2", "2"], 1>, "21212">>,
  Expect<Equal<Join<["o"], "u">, "o">>,
  Expect<Equal<Join<[], "u">, "">>
];

// ============= Your Code Here =============
type ToString<T> = T extends number ? `${T}` : T;
type AppendSepIfNotEmpty<T, Sep> = T extends ""
  ? ""
  : `${ToString<Sep> & string}${T & string}`;
type Join<T, U> = T extends [infer F, ...infer Rest]
  ? `${F & string}${AppendSepIfNotEmpty<Join<Rest, U>, U>}`
  : "";
