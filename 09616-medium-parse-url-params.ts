// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<ParseUrlParams<"">, never>>,
  Expect<Equal<ParseUrlParams<":id">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id/">, "id">>,
  Expect<Equal<ParseUrlParams<"posts/:id/:user">, "id" | "user">>,
  Expect<Equal<ParseUrlParams<"posts/:id/:user/like">, "id" | "user">>
];

// ============= Your Code Here =============
type AddEndSlash<T extends string> = T extends `${infer _}/` ? T : `${T}/`;
type ParseUrlParams<T extends string> =
  AddEndSlash<T> extends `${infer _}:${infer E}/${infer L}`
    ? E | ParseUrlParams<L>
    : never;
