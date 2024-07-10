// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \n\t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];

// ============= Your Code Here =============
type Trim<S extends string> = TrimLeft<TrimRight<S>>;

type TrimLeft<S extends string> = S extends ` ${infer R}` | `\n\t${infer R}`
  ? TrimLeft<R>
  : S;

type TrimRight<S extends string> = S extends `${infer R}\n\t` | `${infer R} `
  ? TrimRight<R>
  : S;
