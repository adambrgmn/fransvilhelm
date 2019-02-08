import { useRef, useEffect } from 'react';

const useEventListener = <K extends keyof WindowEventMap>(
  type: K,
  handler: (ev: WindowEventMap[K]) => any,
): void => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (ev: WindowEventMap[K]): any => handlerRef.current(ev);
    window.addEventListener(type, listener);
    return () => {
      window.removeEventListener(type, listener);
    };
  }, [type]);
};

export { useEventListener };
