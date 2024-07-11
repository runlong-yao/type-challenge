// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
];

// ============= Your Code Here =============
type GetRequired<T, U = Required<T>> = {
  [key in keyof T as T[key] extends U[key & keyof U] ? key : never]: T[key];
};
