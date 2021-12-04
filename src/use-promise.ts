import { useState, useRef, useEffect, useCallback } from 'react';

import { useMount } from './use-lifecycle';

type State<T> =
  | { state: 'idle'; result: null; error: null; execute: () => void }
  | { state: 'pending'; result: null; error: null; execute: () => void }
  | { state: 'resolved'; result: T; error: null; execute: () => void }
  | { state: 'rejected'; result: null; error: unknown; execute: () => void };

type Options<T> = {
  onSuccess?: (result: T) => void;
  onError?: (error: unknown) => void;
};

/**
 * `usePromise` will run the given function and await its result. It can either
 * run immediatedly on mount or when calling the `execute` function returned by
 * the hook.
 *
 * @param promise Promise returning function
 * @param immediate Wether to run the function on mount or only when calling `execute`
 * @param options Optional callback handler onSuccess and onError
 */
export function usePromise<T>(
  promise: () => Promise<T>,
  immediate: boolean = false,
  options: Options<T> = {},
): State<T> {
  const [state, setState] = useState<Omit<State<T>, 'execute'>>({
    state: immediate ? 'pending' : 'idle',
    result: null,
    error: null,
  });

  const immediateRef = useRef(immediate);
  const currentRef = useRef<Promise<any>>();
  const promiseRef = useRef(promise);
  const optionsRef = useRef(options);

  const execute = useCallback(() => {
    setState((prev) => {
      if (prev.state !== 'pending') {
        return {
          state: 'pending',
          result: null,
          error: null,
        };
      }

      return prev;
    });

    let currentPromise = promiseRef
      .current()
      .then((result) => {
        if (currentPromise === currentRef.current) {
          optionsRef.current.onSuccess?.(result);
          setState({ state: 'resolved', error: null, result });
        }
      })
      .catch((error) => {
        if (currentPromise === currentRef.current) {
          optionsRef.current.onError?.(error);
          setState({
            state: 'rejected',
            result: null,
            error,
          });
        }
      });

    currentRef.current = currentPromise;
  }, []);

  useEffect(() => {
    promiseRef.current = promise;
    optionsRef.current = options;
  });

  useMount(() => {
    if (immediateRef.current) execute();
  });

  return { ...state, execute } as State<T>;
}
