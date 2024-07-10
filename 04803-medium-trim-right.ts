// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<TrimRight<"str">, "str">>,
  Expect<Equal<TrimRight<"str ">, "str">>,
  Expect<Equal<TrimRight<"str     ">, "str">>,
  Expect<Equal<TrimRight<"     str     ">, "     str">>,
  Expect<Equal<TrimRight<"   foo bar  \n\t ">, "   foo bar">>,
  Expect<Equal<TrimRight<"">, "">>,
  Expect<Equal<TrimRight<"\n\t \n\t">, "">>
];

//S extends 可以接正则吗
// ============= Your Code Here =============
type TrimRight<S extends string> = S extends `${infer R}\n\t` | `${infer R} `
  ? TrimRight<R>
  : S;

// type ExtractRest<S> = S extends `${infer R}\n\t` | `${infer R} ` ? R : never;
//infer 会寻找最接近的匹配
// type Case1 = ExtractRest<"\n\t ">;
// type Case2 = ExtractRest<"\n\t \n\t">;
