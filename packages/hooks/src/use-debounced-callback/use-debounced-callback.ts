import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef } from 'react';

export function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, waitMs: number) {
  let callbackRef = useRef(callback);
  let debouncedCallback = useMemo(() => {
    let handler = ((...args: any[]) => {
      return callbackRef.current(...args);
    }) as T;

    return debounce(handler, waitMs);
  }, [waitMs]);

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
