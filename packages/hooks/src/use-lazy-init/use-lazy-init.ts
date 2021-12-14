import { useRef } from 'react';

const INIT_SYMBOL = Symbol.for('__INTERNAL_LAZY_INIT__');

export function useLazyInit<T>(init: () => T): T {
  let ref = useRef<T | Symbol>(INIT_SYMBOL);

  if (ref.current === INIT_SYMBOL) {
    ref.current = init();
  }

  return ref.current as T;
}
