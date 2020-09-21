import { useEffect, useRef } from 'react';

/**
 * Will always return the previous value passed to the hook. It is useful if you
 * want to compare a new value to its previous value when it was last rendered.
 * @param value Value to keep in "history"
 */
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export { usePrevious };
