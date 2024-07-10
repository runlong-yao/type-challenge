// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "description">, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

// ============= Your Code Here =============
type MyReadonly2<T extends object, K extends keyof T = any> = {
  +readonly [key in keyof T as Extract<key, K>]: T[key];
} & {
  [key in keyof T as Exclude<key, K>]: T[key];
};

// Intersection types have the following subtype relationships:

// An intersection type I is a subtype of a type T if any type in I is a subtype of T.
// A type T is a subtype of an intersection type I if T is a subtype of each type in I.
