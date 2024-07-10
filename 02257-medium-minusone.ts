// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

// ============= Your Code Here =============
type ToString<T extends number> = `${T}`;
type ToNumber<T extends string> = T extends `${infer R extends number}`
  ? R
  : never;

//0->9
type NeedBorrow<
  From extends string,
  To extends string
> = From extends `0${infer _}`
  ? To extends `9${infer _}`
    ? true
    : false
  : false;
type MaybeBorrow<
  Cur extends string,
  From extends string,
  To extends string
> = `${NeedBorrow<From, To> extends true ? _Minus<Cur> : Cur}${To}`;
type DigitMap<T extends string> = ToNumber<T> extends number
  ? ToString<[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][ToNumber<T>]>
  : never;
type _Minus<From extends string> = From extends `${infer F}${infer Rest}`
  ? Rest extends ""
    ? DigitMap<F>
    : MaybeBorrow<F, Rest, _Minus<Rest>>
  : never;

// type IsPositive<T extends string> = T extends `-${infer _}` ? false : true;
type MinusOneWrap<T extends string> = IfZero<T> extends true
  ? "-1"
  : RemovePrefixZero<_Minus<T>>;

type RemovePrefixZero<T extends string> = T extends `0${infer Rest}`
  ? RemovePrefixZero<Rest>
  : T extends ""
  ? "0"
  : T;

type IfZero<T extends string> = T extends "0" ? true : false;

export type MinusOne<T extends number> = ToNumber<MinusOneWrap<ToString<T>>>;

// https://github.com/type-challenges/type-challenges/issues/13507
