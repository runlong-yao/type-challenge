// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>
];

// ============= Your Code Here =============
export type Flat<T> = { [key in keyof T]: T[key] };
type RequiredByKeys<T extends object, K extends string = never> = Flat<
  [K] extends [never]
    ? Required<T>
    : {
        [key in keyof T as Exclude<key, K>]: T[key];
      } & { [key in K]: Exclude<T[key & keyof T], undefined> }
>;

//【问】-?为啥在非keyof情况下，转为string|undefined

// type D<T extends object, E extends string> = {
//   [key in E]-?: T[key & keyof T];
// };

// type D2<T extends object> = {
//   [key in keyof T]-?: T[key];
// };

// type F = D<{ a?: 1 }, "a">;
// type F2 = D2<{ a?: 1 }>;
