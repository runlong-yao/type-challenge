// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

// ============= Your Code Here =============

type _MyAwaited<T> = T extends Promise<infer U>
  ? _MyAwaited<U>
  : T extends {
      then: (onfulfilled: (arg: infer U) => any) => any;
    }
  ? U
  : T;
type MyAwaited<
  T extends
    | Promise<unknown>
    | { then: (onfulfilled: (arg: unknown) => any) => any }
> = _MyAwaited<T>;
