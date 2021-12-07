import React, { useEffect, useRef, useMemo } from 'react';

import { InternalRefArg } from './types';
import { assignRef } from './utils';

/**
 * `useProxyRef` is similar to `useComposedRefs` with the difference that this
 * will return a "proper" ref object (one with `current` prop). It is useful for
 * when a third party api explicitly requires a ref object and can't accept a
 * ref callback, which you get from `useComposedRefs`. The returned ref object
 * works as standard react refs object with the added benefit that the any
 * attempts to set `ref.current` will also propagate to the provided refs.
 *
 * @param initialValue Initial ref value
 * @param refs Ref objects or callbacks
 * @return React RefObject
 */
export function useProxyRef<T>(
  initialValue: T,
  ...refs: InternalRefArg<T>[]
): React.MutableRefObject<T>;
export function useProxyRef<T = undefined>(
  initialValue: undefined,
  ...refs: InternalRefArg<T>[]
): React.MutableRefObject<T | undefined>;
export function useProxyRef<T>(
  initialValue: T | null,
  ...refs: InternalRefArg<T>[]
): React.RefObject<T>;
export function useProxyRef<T>(
  initialValue: T,
  ...refs: InternalRefArg<T>[]
): React.RefObject<T> | React.MutableRefObject<T> {
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
