// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type cases = [
  Expect<Equal<DeepOmit<obj, "person">, {}>>,
  Expect<
    Equal<DeepOmit<obj, "person.name">, { person: { age: { value: number } } }>
  >,
  Expect<Equal<DeepOmit<obj, "name">, obj>>,
  Expect<
    Equal<
      DeepOmit<obj, "person.age.value">,
      { person: { name: string; age: {} } }
    >
  >
];

// ============= Your Code Here =============
type DeepOmit<
  T extends object,
  U extends string
> = U extends `${infer Key}.${infer Rest}`
  ? {
      [key in keyof T]: key extends Key
        ? DeepOmit<T[Key & keyof T] & object, Rest>
        : T[key];
    }
  : {
      [key in keyof T as Exclude<key, U>]: T[key];
    };
type F = DeepOmit<obj, "person.name">;

//[问]infer string的规则
