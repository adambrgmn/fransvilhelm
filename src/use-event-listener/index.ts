import { useRef, useEffect } from 'react';

const useEventListener = <K extends keyof WindowEventMap>(
  type: K,
  handler: (ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions | undefined,
): void => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (ev: WindowEventMap[K]): any => handlerRef.current(ev);
    window.addEventListener(type, listener, options);
    return () => {
      window.removeEventListener(type, listener, options);
    };
  }, [type, options]);
};

export { useEventListener };
