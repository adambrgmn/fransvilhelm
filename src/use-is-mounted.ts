import { useRef, useEffect } from 'react';

const useIsMounted = (): (() => boolean) => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
    return () => (ref.current = false);
  }, []);

  return () => ref.current;
};

export { useIsMounted };
