// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

// ============= Your Code Here =============

type Reach<T extends unknown[], V> = T["length"] extends V ? true : false;
type _GreaterThan<
  T extends number,
  U extends number,
  Output extends unknown[] = []
> = Reach<Output, T> extends false
  ? Reach<Output, U> extends false
    ? _GreaterThan<T, U, [1, ...Output]>
    : true
  : false;

type GreaterThan<T extends number, U extends number> = _GreaterThan<T, U>;

// type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// type DigitStr = `${Digit}`;

// type GreaterThanDict = {
//   "0": Exclude<DigitStr, "0">;
//   "1": Exclude<DigitStr, "0" | "1">;
//   "2": Exclude<DigitStr, "0" | "1" | "2">;
//   "3": Exclude<DigitStr, "0" | "1" | "2" | "3">;
//   "4": Exclude<DigitStr, "0" | "1" | "2" | "3" | "4">;
//   "5": "6" | "7" | "8" | "9";
//   "6": "7" | "8" | "9";
//   "7": "8" | "9";
//   "8": "9";
//   "9": never;
// };

// type GreaterThanDigitVersion<
//   D1 extends DigitStr,
//   D2 extends DigitStr
// > = D1 extends GreaterThanDict[D2] ? true : false;

// type NumStrToDigitStrArr<
//   NumStr extends string,
//   Result extends unknown[] = []
// > = NumStr extends `${infer L}${infer Rest}`
//   ? NumStrToDigitStrArr<Rest, [...Result, L]>
//   : Result extends DigitStr[] // coerce return type into DigitStr[]
//   ? Result
//   : never;

// type NumToDigitStrArr<N extends number> = NumStrToDigitStrArr<`${N}`>;

// type GreaterThanDigitArrayVersion<
//   TA extends DigitStr[],
//   UA extends DigitStr[],
//   NumTDigits extends number = TA["length"],
//   NumUDigits extends number = UA["length"]
// > = NumTDigits extends NumUDigits
//   ? TA extends [
//       infer TDigit extends DigitStr,
//       ...infer TRest extends DigitStr[]
//     ]
//     ? UA extends [
//         infer UDigit extends DigitStr,
//         ...infer URest extends DigitStr[]
//       ]
//       ? GreaterThanDigitVersion<TDigit, UDigit> extends true
//         ? true
//         : GreaterThanDigitVersion<UDigit, TDigit> extends true
//         ? false
//         : GreaterThanDigitArrayVersion<TRest, URest>
//       : never
//     : false
//   : GreaterThan<NumTDigits, NumUDigits>;

// type GreaterThan<
//   T extends number,
//   U extends number
// > = GreaterThanDigitArrayVersion<NumToDigitStrArr<T>, NumToDigitStrArr<U>>;
