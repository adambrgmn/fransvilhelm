import { useRef, useEffect, useMemo } from 'react';
import { Subscription, useSubscription } from 'use-subscription';

const useEventListener = <K extends keyof WindowEventMap>(
  type: K,
  handler: (ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): void => {
  const handlerRef = useRef(handler);
  const optionsRef = useRef(options);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (ev: WindowEventMap[K]): any => handlerRef.current(ev);
    window.addEventListener(type, listener, optionsRef.current);
    return () => {
      window.removeEventListener(type, listener);
    };
  }, [type, options]);
};

const useWindowSubscription = <K extends keyof WindowEventMap, V>(
  event: K,
  getCurrentValue: () => V,
  options?: boolean | AddEventListenerOptions,
): V => {
  const optionsRef = useRef(options);
  const subscription: Subscription<V> = useMemo(
    () => ({
      getCurrentValue,
      subscribe: (callback) => {
        window.addEventListener(event, callback, optionsRef.current);
        return () => window.removeEventListener(event, callback);
      },
    }),
    [event, getCurrentValue],
  );

  const value = useSubscription(subscription);
  return value;
};

export { useEventListener, useWindowSubscription };
