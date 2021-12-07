import { useEffect, useRef, useMemo } from 'react';

import { assignRef } from './utils';

export function useProxyRef<T>(
  initialValue: T,
  ...refs: React.Ref<T>[]
): React.MutableRefObject<T>;
export function useProxyRef<T = undefined>(
  initialValue: undefined,
  ...refs: React.Ref<T>[]
): React.MutableRefObject<T | undefined>;
export function useProxyRef<T>(
  initialValue: T | null,
  ...refs: React.Ref<T>[]
): React.RefObject<T>;
export function useProxyRef<T>(initialValue: T, ...refs: React.Ref<T>[]) {
  let ref = useRef<T>(initialValue);
  let refsRef = useRef(refs);

  useEffect(() => {
    refsRef.current = refs;
  }, [refs]);

  let proxy = useMemo(() => {
    let handler: ProxyHandler<typeof ref> = {
      get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        if (prop !== 'current') {
          throw new Error(
            `It is not allowed to set any other property than 'current' on a ref. Tried to set '${prop.toString()}'`,
          );
        }

        for (let ref of refsRef.current) {
          assignRef(ref, value);
        }

        return Reflect.set(target, prop, value, receiver);
      },
    };

    let proxy = new Proxy(ref, handler);
    return proxy;
  }, []);

  return proxy;
}
