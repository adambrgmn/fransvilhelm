export {};

const TIMES = {
  millisecond: 1, //                                                 1 (ms)
  second: 1_000, //                                       1 (s) * 1000 (ms)
  minute: 60_000, //                                     60 (s) * 1000 (ms)
  hour: 3_600_000, //                         60 (min) * 60 (s) * 1000 (ms)
  day: 86_400_000, //                24 (h) * 60 (min) * 60 (s) * 1000 (ms)
  week: 604_800_000, //      7 (d) * 24 (h) * 60 (min) * 60 (s) * 1000 (ms)
  month: 2_592_000_000, //  30 (d) * 24 (h) * 60 (min) * 60 (s) * 1000 (ms)
  year: 31_536_000_000, // 365 (d) * 24 (h) * 60 (min) * 60 (s) * 1000 (ms)
} as const;

const SUFFIXES = {
  millisecond: 'ms',
  second: 's',
  minute: 'min',
  hour: 'h',
  day: 'd',
  week: 'w',
  month: 'mo',
  year: 'y',
} as const;

const UNITS = Object.keys(TIMES) as Unit[];

export type Unit = keyof typeof TIMES;
export type UnitPlural = `${Unit}s`;
export type ToUnitPlural = `to${Capitalize<UnitPlural>}`;

export type Suffix<U extends Unit | UnitPlural> = typeof SUFFIXES[Singularize<U>];

export type Time<From extends Unit | UnitPlural> = {
  [Key in Unit | UnitPlural | ToUnitPlural]: () => number;
} & {
  to<U extends Unit | UnitPlural>(unit: U): number;
  toString<U extends Unit | UnitPlural = From>(unit?: U): `${number}${Suffix<U>}`;
};

export function time<From extends Unit | UnitPlural>(value: number, from: From) {
  let ms = value * TIMES[toSingular(from)];

  function to<U extends Unit | UnitPlural>(unit: U) {
    return ms / TIMES[toSingular(unit)];
  }

  function toString<U extends Unit | UnitPlural = From>(unit: U = from as unknown as U): `${number}${Suffix<U>}` {
    let suffix = SUFFIXES[toSingular(unit)];
    return `${to(unit)}${suffix}` as any;
  }

  let time = { to, toString } as Time<Pluralize<From>>;

  for (let key of UNITS) {
    let singular = toSingular(key);
    let plural = toPlural(key);
    let capitalized = toCapitalized(key);

    time[singular] = to.bind(undefined, key);
    time[plural] = to.bind(undefined, key);
    time[capitalized] = to.bind(undefined, key);
  }

  return time;
}

function toSingular<U extends string>(unit: U) {
  return unit.replace(/s$/, '') as Singularize<U>;
}

function toPlural<U extends string>(unit: U) {
  return (toSingular(unit) + 's') as Pluralize<U>;
}

function toCapitalized<U extends string>(unit: U) {
  let plural = toPlural(unit);
  let capitalized = capitalize(plural);
  return `to${capitalized}` as const;
}

function capitalize<Str extends string>(value: Str) {
  return (value.charAt(0).toUpperCase() + value.slice(1)) as Capitalize<Str>;
}

type Pluralize<Str extends string> = Str extends `${string}s` ? Str : `${Str}s`;

type Singularize<Str extends string> = Str extends `${infer Singular}s` ? Singular : Str;
