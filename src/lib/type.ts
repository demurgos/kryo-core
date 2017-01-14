import {Dictionary, Document} from "./utils";

export type Format = "bson" | "json";

export interface TypeAsync<T, D> {
  isSync: boolean;
  name: string;

  read(format: Format, val: any, options?: any): Promise<T>;
  readTrusted(format: Format, val: any, options?: any): Promise<T>;
  write(format: Format, val: T, options?: any): Promise<any>;
  test(val: any, options?: any): Promise<Error>;
  equals(val1: T, val2: T, options?: any): Promise<boolean>;
  clone(val: T, options?: any): Promise<T>;
  diff(oldVal: T, newVal: T, options?: any): Promise<D>;
  patch(oldVal: T, diff: D, options?: any): Promise<T>;
  revert(newVal: T, diff: D, options?: any): Promise<T>;
}

export interface TypeSync<T, D> {
  isSync: boolean;
  name: string;

  readSync(format: string, val: any, options?: any): T;
  readTrustedSync(format: string, val: any, options?: any): T;
  writeSync(format: string, val: T, options?: any): any;
  testSync(val: any, options?: any): Error;
  equalsSync(val1: T, val2: T, options?: any): boolean;
  cloneSync(val: T, options?: any): T;
  diffSync(oldVal: T, newVal: T, options?: any): D;
  patchSync(oldVal: T, diff: D, options?: any): T;
  revertSync(newVal: T, diff: D, options?: any): T;
}

export interface Type<T, D> extends TypeAsync<T, D> {
  isSync: boolean;

  readSync?(format: string, val: any, options?: any): T;
  readTrustedSync?(format: string, val: any, options?: any): T;
  writeSync?(format: string, val: T, options?: any): any;
  testSync?(val: any, options?: any): Error;
  equalsSync?(val1: T, val2: T, options?: any): boolean;
  cloneSync?(val: T, options?: any): T;
  diffSync?(oldVal: T, newVal: T, options?: any): D;
  patchSync?(oldVal: T, diff: D, options?: any): T;
  revertSync?(newVal: T, diff: D, options?: any): T;
}

export interface StaticTypeAsync<T, D> {
  new(...args: any[]): TypeAsync<T, D>;
  prototype?: TypeAsync<T, D>;
}

export interface StaticTypeSync<T, D> {
  new(...args: any[]): TypeSync<T, D>;
  prototype?: TypeSync<T, D>;
}

export interface StaticType<T, D> {
  new(...args: any[]): Type<T, D>;
  prototype?: Type<T, D>;
}

export interface CollectionTypeAsync<T, D> extends TypeAsync<T, D> {
  reflect(visitor: (value?: any, key?: any, parent?: CollectionType<any, any>) => any, options?: any): Promise<any>;
}

export interface CollectionTypeSync<T, D> extends TypeSync<T, D> {
  reflectSync(visitor: (value?: any, key?: any, parent?: CollectionType<any, any>) => any, options?: any): any;
}

export interface CollectionType<T, D> extends CollectionTypeAsync<T, D>, Type<T, D> {
  reflectSync?(visitor: (value?: any, key?: any, parent?: CollectionType<any, any>) => any, options?: any): any;
}

export interface DocumentDiff {
  set: Document; // val
  update: Dictionary<any>; // diff
  unset: Document; // val
}