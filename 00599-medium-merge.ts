// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];

// ============= Your Code Here =============
type Flat<T extends object> = {
  [k in keyof T]: T[k];
};
type Merge<F, S> = Flat<
  {
    [k in keyof S]: S[k];
  } & { [k in keyof F as Exclude<k, keyof S>]: F[k] }
>;
