// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils";

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

const result3 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

// ============= Your Code Here =============
type Chainable<T extends object = {}> = {
  option<V extends string, U extends unknown>(
    key: Exclude<V, keyof T>,
    value: U
  ): Chainable<{ [key in V]: U } & Omit<T, V>>;
  get(): T;
};

type Test = "A" extends "A" | "B" ? true : false;
type Test2 = "A" | "B" extends "A" ? true : false;
type Test3 = B extends A ? true : false;
type Test4 = A extends B ? true : false;

class A {}

class B extends A {
  test: string = "";
}
