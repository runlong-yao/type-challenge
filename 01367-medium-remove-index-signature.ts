// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  [key: string]: () => void;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol("foobar");
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];

// ============= Your Code Here =============
type RemoveIndexSignature<T> = {
  [key in keyof T as string extends key
    ? never
    : number extends key
    ? never
    : symbol extends key
    ? never
    : key]: T[key];
};

//[x:number]本质,index的类型是基础类型
