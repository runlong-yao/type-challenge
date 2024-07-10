// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { TupleToUnion } from "./00010-medium-tuple-to-union";

type ModifierKeys = ["cmd", "ctrl", "opt", "fn"];
type CaseTypeOne =
  | "cmd ctrl"
  | "cmd opt"
  | "cmd fn"
  | "ctrl opt"
  | "ctrl fn"
  | "opt fn";

type cases = [Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>];

//为何T extends [infer F, ...infer Rest]?Rest是string[]
//为何T extends [infer F, ...infer Rest]?F为啥默认不是string
//为啥还需要加F extends string

// ============= Your Code Here =============
// 实现 Combs
type Combs<T extends any[]> = T extends [infer F extends string, ...infer Rest]
  ? CombString<F, TupleToUnion<Rest> & string> | Combs<Rest>
  : never;

type CombString<T extends string, O extends string> = `${T} ${O}`;
