// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// ============= Your Code Here =============

type Flat<T extends object> = {
  [k in keyof T]: T[k];
};
type Diff<O, O1> = Flat<
  {
    [key in keyof O as Exclude<key, keyof O1>]: O[key];
  } & { [key in keyof O1 as Exclude<key, keyof O>]: O1[key] }
>;
