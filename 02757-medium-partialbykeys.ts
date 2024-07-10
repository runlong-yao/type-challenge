// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { Flat } from "./02759-medium-requiredbykeys";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>
];

// ============= Your Code Here =============

type PartialByKeys<T extends object, K extends string = never> = [K] extends [
  never
]
  ? Partial<T>
  : Flat<
      {
        [key in keyof T as Exclude<key, K>]: T[key];
      } & { [key in K]?: T[key & keyof T] }
    >;
