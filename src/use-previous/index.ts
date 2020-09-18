import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T): T => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export { usePrevious };
