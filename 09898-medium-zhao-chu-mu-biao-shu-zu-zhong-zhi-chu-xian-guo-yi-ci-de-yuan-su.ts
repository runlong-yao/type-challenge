// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>
];

// ============= Your Code Here =============
type IsInclude<T extends any[], V> = T extends [infer F, ...infer Rest]
  ? F extends V
    ? true
    : IsInclude<Rest, V>
  : false;

type Exclude<T extends any[], V> = T extends [infer F, ...infer Rest]
  ? F extends V
    ? Exclude<Rest, V>
    : [F, ...Exclude<Rest, V>]
  : [];

type FindEles<T extends any[]> = T extends [infer F, ...infer Rest]
  ? IsInclude<Rest, F> extends true
    ? FindEles<Exclude<Rest, F>>
    : [F, ...FindEles<Rest>]
  : [];

// type Test = FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>;
// type Test2 = Exclude<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6], 6>;

// type Test2<T, U extends string> = T extends `${infer F}${U}${U}${infer R}`
//   ? R
//   : never;

// type F = Test2<"012234", "2">;

//infer对于分解字符串可以是支持的
//type Test2<T, U extends string> = T extends `${infer F}${U}${U}${infer R}`
// ? R
// : never;

//infer对于分解数组，是无法支持两个...(分解符号),算是和数组分解语法对应上了
