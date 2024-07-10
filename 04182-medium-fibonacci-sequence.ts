// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { MinusOne } from "./02257-medium-minusone";
type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

// ============= Your Code Here =============
type Fibonacci<T extends number> = Fibonacci<MinusOne<T>>;

type F = Fibonacci<30>;
