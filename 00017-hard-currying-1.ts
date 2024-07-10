// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);
const curried3 = Currying(() => true);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>
];

// ============= Your Code Here =============

type Traverse<U extends unknown[], Return> = U extends [
  infer Arg,
  ...infer Rest
]
  ? (arg: Arg) => Traverse<Rest, Return>
  : Return;

type CurringFn<T extends Function> = T extends (
  ...args: infer U
) => infer Return
  ? U extends []
    ? T
    : Traverse<U, Return>
  : never;
declare function Currying<T extends Function>(fn: T): CurringFn<T>;

type F = typeof curried3;
