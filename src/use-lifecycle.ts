import { EffectCallback, useEffect, useRef } from 'react';

/**
 * useMount hook can be use as a replacement for `componentDidMount` found on
 * class components. It will only fire once directry after initial render.
 *
 * @param callback Effect callback called on initial mount
 */
export function useMount(callback: EffectCallback) {
  const initialMounted = useRef(false);
  const callbackRef = useRef(callback);

  useEffect(() => {
    if (initialMounted.current) return;
    initialMounted.current = true;
    return callbackRef.current();
  }, []);
}

/**
 * useUpdate hook can be used as a replacement for `componentDidUpdate` found on
 * class components. It will fire every time the component has been updated
 * (either via state or props). This is basically `useEffect` but without the
 * call after initial render.
 *
 * @param callback Effect calback to call on every update
 * @param deps Optional effect deps
 */
export function useUpdate(callback: EffectCallback, deps?: any[]) {
  const initialMounted = useRef(false);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (initialMounted.current) return callbackRef.current();
    initialMounted.current = true;
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * `useUnmount` hook can be used as a replacement for `componentWillUnmount`
 * found on class components. It will only fire once the component is about to
 * be unmounted.
 *
 * @param callback Callback fired when component is unmounted
 */
export function useUnmount(callback: () => void) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => () => callbackRef.current(), []);
}
