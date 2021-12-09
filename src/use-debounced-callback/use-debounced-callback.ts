import { useMemo, useRef, useEffect } from 'react';
import debounce from 'lodash.debounce';

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  wait: number,
) {
  let callbackRef = useRef(callback);
  let debouncedCallback = useMemo(() => {
    let handler = ((...args: any[]) => {
      return callbackRef.current(...args);
    }) as T;

    return debounce(handler, wait);
  }, [wait]);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return debouncedCallback;
}
