export function typedObjectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export type KeyedRecord<
  K extends keyof V,
  V extends { [Key in K]: string | number | symbol }
> = Record<V[K], V>;

export function generateRecord<
  K extends keyof V,
  V extends { [Key in K]: string | number | symbol }
>(entries: V[], key: K): KeyedRecord<K, V> {
  return entries.reduce(
    (acc, entry) => ({ ...acc, [entry[key]]: entry }),
    {} as KeyedRecord<K, V>
  );
}

//type DataClassType<
//  T extends { [K in keyof T]: T[K] },
//  Defaults extends keyof T
//> = T & {
//  new (args: Partial<T> & Omit<T, Defaults>): T;
//};
//
//export function DataClass<
//  T extends { [K in keyof T]: T[K] },
//  Defaults extends keyof T
//>(defaults?: Pick<T, Defaults>): DataClassType<T, Defaults> {
//  return class {
//    constructor(args: Partial<T> & Omit<T, Defaults>) {
//      Object.assign(this, args);
//    }
//  } as DataClassType<T, Defaults>;
//}
//
