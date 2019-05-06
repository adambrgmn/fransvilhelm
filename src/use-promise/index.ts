import { useEffect, useRef, useState } from 'react';
import { useIsMounted } from '../use-is-mounted';

enum AsyncState {
  initial = 'INITIAL',
  pending = 'PENDING',
  fullfilled = 'FULLFILLED',
  rejected = 'REJECTED',
}

interface UsePromiseInput<T> {
  (): Promise<T>;
}

type UsePromiseResult<T> =
  | [AsyncState.initial, null, null]
  | [AsyncState.pending, null, null]
  | [AsyncState.fullfilled, T, null]
  | [AsyncState.rejected, null, any];

interface UseCurrentPromiseResult<T> {
  set(promise: Promise<T>): void;
  is(promise: Promise<T>): boolean;
}

const useCurrentPromise = <T>(): UseCurrentPromiseResult<T> => {
  const ref: React.MutableRefObject<Promise<T> | null> = useRef(null);
  return {
    set: (promise: Promise<T>) => (ref.current = promise),
    is: (promise: Promise<T>) => ref.current === promise,
  };
};

/**
 * Executes a promise and eventually returns the resolved or rejected value.
 *
 * @template T The expected resolved value
 * @param {UsePromiseInput<T>} promise A function returning a promise, or an async function
 * @param {(ReadonlyArray<any> | undefined)} [deps] Dependecy array for when to rerun promise
 * @returns {UsePromiseResult<T>} Array containing [state, result, error]
 *
 * @example
 *   const Username = ({ id }) => {
 *     const [state, result, error] = usePromise(
 *       () => fetch(`/user/${id}`).then(res => res.json()),
 *       [id],
 *     );
 *
 *     if (state === AsyncState.fullfilled) return <p>{result.username}</p>;
 *     if (state === AsyncState.rejected) return <p>An error occured ({error.message})</p>;
 *     return <p>Loading</p>;
 *   }
 */
const usePromise = <T>(
  promise: UsePromiseInput<T>,
  deps?: ReadonlyArray<any> | undefined,
): UsePromiseResult<T> => {
  const [state, setState] = useState<UsePromiseResult<T>>(() => [
    AsyncState.initial,
    null,
    null,
  ]);

  const currentPromise = useCurrentPromise();
  const isMounted = useIsMounted();

  const shouldHandlePromise = (promise: Promise<T>): boolean => {
    return isMounted() && currentPromise.is(promise);
  };

  useEffect(() => {
    const p = promise();
    setState([AsyncState.pending, null, null]);
    currentPromise.set(p);

    p.then(
      result => {
        if (shouldHandlePromise(p)) {
          setState([AsyncState.fullfilled, result, null]);
        }
      },
      error => {
        if (shouldHandlePromise(p)) {
          setState([AsyncState.rejected, null, error]);
        }
      },
    );
  }, deps); // eslint-disable-line

  return state;
};

export { usePromise, AsyncState };
