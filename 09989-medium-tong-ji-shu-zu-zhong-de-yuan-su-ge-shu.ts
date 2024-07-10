// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import type { IsTuple } from "./04484-medium-istuple";
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<["1", "2", "0"]>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<["a", "b", ["c", ["d"]]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >
];

// ============= Your Code Here =============
//【问1】为啥不需要Flat去合并&操作
// type Flat<T extends object> = { [key in keyof T]: T[key] };
//【问2】为啥T extends unknown[]时类型返回会错误

type Plus<
  TONGJI extends Record<PropertyKey, any[]>,
  V extends PropertyKey
> = V extends keyof TONGJI
  ? { [key in keyof TONGJI]: key extends V ? [...TONGJI[key], V] : TONGJI[key] }
  : TONGJI & { [key in V]: [V] };
type IsNever<T> = [T] extends [never] ? true : false;

type _CountElementNumberToObject<
  T,
  TONGJI extends Record<PropertyKey, any[]> = {}
> = T extends [infer F, ...infer Rest]
  ? IsNever<F> extends true
    ? _CountElementNumberToObject<Rest, TONGJI>
    : IsTuple<F> extends true
    ? _CountElementNumberToObject<F, TONGJI>
    : _CountElementNumberToObject<Rest, Plus<TONGJI, F & PropertyKey>>
  : TONGJI;

type MapToNumber<T extends Record<PropertyKey, any[]>> = {
  [key in keyof T]: T[key]["length"];
};
type CountElementNumberToObject<T extends unknown[]> = MapToNumber<
  _CountElementNumberToObject<T>
>;
