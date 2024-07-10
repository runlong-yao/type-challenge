// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

// ============= Your Code Here =============
type CheckStartFill<T extends unknown[], U> = T["length"] extends U
  ? true
  : false;
type CheckStopFill<T extends unknown[], U> = T["length"] extends U
  ? true
  : false;
type IsNeedFill<
  NeedFill extends boolean,
  Output extends any[],
  Start extends number,
  End extends number
> = CheckStopFill<Output, End> extends true
  ? false
  : NeedFill extends false
  ? CheckStartFill<Output, Start>
  : true;

type _Fill<
  Input extends unknown[],
  V,
  Start extends number,
  End extends number,
  Output extends any[] = [],
  NeedFill extends boolean = false
> = Input extends [infer F, ...infer Rest]
  ? _Fill<
      Rest,
      V,
      Start,
      End,
      [
        ...Output,
        IsNeedFill<NeedFill, Output, Start, End> extends true ? V : F
      ],
      IsNeedFill<NeedFill, Output, Start, End>
    >
  : Output;
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"]
> = _Fill<T, N, Start, End>;
