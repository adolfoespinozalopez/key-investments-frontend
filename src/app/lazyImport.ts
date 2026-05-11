import { lazy } from 'react';

export const lazyImport = <
  T extends Record<string, any>,
  U extends keyof T
>(
  factory: () => Promise<T>,
  name: U
) => {
  return lazy(() => factory().then((module) => ({ default: module[name] })));
};