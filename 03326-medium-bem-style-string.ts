// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<BEM<"btn", ["price"], []>, "btn__price">>,
  Expect<
    Equal<
      BEM<"btn", ["price"], ["warning", "success"]>,
      "btn__price--warning" | "btn__price--success"
    >
  >,
  Expect<
    Equal<
      BEM<"btn", [], ["small", "medium", "large"]>,
      "btn--small" | "btn--medium" | "btn--large"
    >
  >
];

// ============= Your Code Here =============

type _BEM<B extends string, E extends string, M extends string> = `${B}${Prefix<
  E,
  "__"
>}${Prefix<M, "--">}`;

type Prefix<T extends string, pre extends string> = T extends string
  ? ""
  : `${pre}${T}`;

type BEM<B extends string, E extends string[], M extends string[]> = any;
