// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null];

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ["key", undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ["key", undefined]>>,
  Expect<
    Equal<
      ObjectEntries<{ key: string | undefined }>,
      ["key", string | undefined]
    >
  >
];

// ============= Your Code Here =============
type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>;

type ObjectEntries<T> = RemoveUndefined<
  {
    [K in keyof T]: {} extends Pick<T, K>
      ? [K, RemoveUndefined<T[K]>]
      : [K, T[K]];
  }[keyof T]
>;

//{} extends Pick<T, K>
//如果是{key?:any}的情况 {} extends {key?:any} 是true
//{key?:any}其实是空数组

type E = ObjectEntries<{ key: undefined }>;

type PickTest = {} extends Pick<{ key: undefined }, "key"> ? true : false;
// type _ObjectEntries<T, M extends object> = T extends string
//   ? [T, M[T & keyof M]]
//   : never;
// type TransferNever<T> = T extends [infer U, infer V]
//   ? [U, [V] extends [never] ? undefined : V]
//   : never;
// type ObjectEntries<T extends object> = TransferNever<
//   _ObjectEntries<keyof T, Required<T>>
// >;
