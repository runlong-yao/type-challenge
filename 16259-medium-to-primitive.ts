// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type PersonInfo = {
  name: "Tom";
  age: 30;
  married: false;
  addr: {
    home: "123456";
    phone: "13111111111";
  };
  hobbies: ["sing", "dance"];
  readonlyArr: readonly ["test"];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

type Types = [string, number, boolean, Function, any[], object];
type _ToPrimitive<T, U = Types> = U extends [infer F, ...infer Rest]
  ? T extends F
    ? F
    : _ToPrimitive<T, Rest>
  : unknown;
// ============= Your Code Here =============
type IsEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U
  ? 1
  : 2
  ? true
  : false;
type IsInclude<T, U extends unknown[]> = U extends [infer F, ...infer Rest]
  ? IsEqual<F, T> extends true
    ? true
    : IsInclude<T, Rest>
  : false;
type ToPrimitive<T> = {
  [key in keyof T]: IsInclude<
    _ToPrimitive<T[key]>,
    [any[], object]
  > extends true
    ? ToPrimitive<T[key]>
    : _ToPrimitive<T[key]>;
};

// type Test = ToPrimitive<PersonInfo>;
// type Test2 = _ToPrimitive<() => void>;
// type Test3 = IsInclude<
//   _ToPrimitive<{
//     home: "123456";
//     phone: "13111111111";
//   }>,
//   [any[], object]
// >;
// type Test4 = _ToPrimitive<{
//   home: "123456";
//   phone: "13111111111";
// }>;
