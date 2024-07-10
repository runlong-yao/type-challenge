// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Model {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<
    Equal<
      OmitByType<Model, string>,
      { count: number; isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<
    Equal<
      OmitByType<Model, number>,
      { name: string; isReadonly: boolean; isEnable: boolean }
    >
  >
];

// ============= Your Code Here =============
// type isEqual<T, U> = (() => T extends U ? 1 : 2) extends () => U extends T
//   ? 1
//   : 2
//   ? true
//   : false;
type OmitByType<T extends object, U> = {
  [key in keyof T as T[key] extends U ? never : key]: T[key];
};
