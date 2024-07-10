// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type test1 = { id: "1"; myProp: { foo: "2" } };

type testExpect1 = {
  id: "1";
  foo: "2";
};

type test2 = {
  id: "1";
  prop1: { zoo: "2" };
  prop2: { foo: "4" };
};

type testExpect2 = {
  id: "1";
  prop1: { zoo: "2" };
  foo: "4";
};

type test3 = {
  prop1: { zoo: "2"; a: 2; b: 4; c: 7 };
  prop2: { foo: "4"; v: 2; d: 4; g: 7 };
  k: 289;
};

type testExpect3 = {
  zoo: "2";
  a: 2;
  b: 4;
  c: 7;
  prop2: { foo: "4"; v: 2; d: 4; g: 7 };
  k: 289;
};

type test4 = { id: "1"; myProp: { foo: "2" } };

type testExpect4 = {
  id: "1";
  myProp: { foo: "2" };
};

type cases = [
  Expect<Equal<ExtractToObject<test1, "myProp">, testExpect1>>,
  Expect<Equal<ExtractToObject<test2, "prop2">, testExpect2>>,
  Expect<Equal<ExtractToObject<test3, "prop1">, testExpect3>>,
  // @ts-expect-error
  Expect<Equal<ExtractToObject<test4, "prop4">, testExpect4>>
];

// ============= Your Code Here =============
type Flat<T extends object> = { [key in keyof T]: T[key] };
type ExtractToObject<T extends object, U extends keyof T> = Flat<
  {
    [key in keyof T as U extends key ? never : key]: T[key];
  } & (T[U & keyof T] extends object ? T[U & keyof T] : {})
>;
