// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type test1 = {
  key: "cat";
  value: "green";
};

type testExpect1 = {
  key: "cat";
  value: "green";
  home: boolean;
};

type test2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
};

type testExpect2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
  home: 1;
};

type test3 = {
  key: "cow";
  value: "yellow";
  sun: false;
};

type testExpect3 = {
  key: "cow";
  value: "yellow";
  sun: false;
  moon: false | undefined;
};

type cases = [
  // The Equal function does not take an intersection equal to an object. Try computing your code:

  Expect<Equal<AppendToObject<test1, "home", boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, "home", 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, "moon", false | undefined>, testExpect3>>
];

// ============= Your Code Here =============
//其实这个Flat可以不加
type Flat<T> = {
  [K in keyof T]: T[K];
};
type AppendToObject<T extends object, U extends string, V> = Flat<
  T & {
    [key in U]: V;
  }
>;
