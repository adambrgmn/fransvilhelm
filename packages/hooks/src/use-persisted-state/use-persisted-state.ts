import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useEventListener } from '../use-event-listener';
import { canUseDOM } from '../utils';

interface StorageAdapter<S> {
  get(defaultValue: S | (() => S)): S;
  set(value: S): void;
  remove(): void;
}

const createStorageAdapter = <S>(key: string): StorageAdapter<S> => {
  return {
    get: (defaultValue: S | (() => S)): S => {
      const fromStorage = window.localStorage.getItem(key);
      if (fromStorage) return JSON.parse(fromStorage);
      return defaultValue instanceof Function ? defaultValue() : defaultValue;
    },
    set: (value: S) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    remove: () => {
      window.localStorage.removeItem(key);
    },
  };
};

const globalStates = new Map<string, { callbacks: ((v: any) => void)[]; value: any }>();

interface GlobalState<S> {
  emit(value: S): void;
  deregister(): void;
}

const createGlobalState = <S>(
  key: string,
  callback: (value: S) => void,
  initialState: S | (() => S),
): GlobalState<S> => {
  const state = globalStates.get(key) || {
    callbacks: [],
    value: initialState instanceof Function ? initialState() : initialState,
  };

  state.callbacks.push(callback);
  globalStates.set(key, state);

  return {
    emit: (value: S) => {
      const state = globalStates.get(key);
      if (state && state.value !== value) {
        state.value = value;
        state.callbacks.forEach((cb) => {
          if (cb !== callback) cb(value);
        });

        globalStates.set(key, state);
      }
    },
    deregister: () => {
      const state = globalStates.get(key);
      if (state) {
        state.callbacks = state.callbacks.filter((cb) => cb !== callback);
        globalStates.set(key, state);
      }
    },
  };
};

const isFn = <S>(x: S | (() => S)): x is () => S => typeof x === 'function';

/**
 * Use persisted state as a drop in replacement for Reacts built-in hook
 * `useState`.
 *
 * By default it will use the key `local-storage-hook`. But you probably want to
 * set another key if you plan to use this hook on several places across your
 * application
 *
 * @param initialState Default initial state, if non is found on `localStorage`
 * @param key Key to store value on
 * @returns Returns state and setState as an array tuple (same as `useState`)
 *
 * @example
 *   const PersistedCounter = () => {
 *     const [count, setCount] = usePersistedState(0, 'counter');
 *     return <button onClick={() => setCount(count + 1)}>{count}</button>;
 *   }
 */
export function usePersistedState<S>(
  initialState: S | (() => S),
  key: string = 'local-storage-hook',
): [S, Dispatch<SetStateAction<S>>] {
  const globalState = useRef<GlobalState<S> | null>(null);
  const storage = useMemo(() => createStorageAdapter<S>(key), [key]);
  const [state, setState] = useState(() =>
    canUseDOM() ? storage.get(initialState) : isFn(initialState) ? initialState() : initialState,
  );

  const storageListener = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        const nextState = JSON.parse(event.newValue);
        if (nextState !== state) setState(nextState);
      }
    },
    [key, state],
  );

  useEventListener('storage', storageListener);

  useEffect(() => {
    globalState.current = createGlobalState(key, setState, initialState);
    return () => {
      if (globalState.current) globalState.current.deregister();
    };
  }, [initialState, key]);

  useEffect(() => {
    if (state != null) {
      storage.set(state);
    } else {
      storage.remove();
    }

    if (globalState.current) globalState.current.emit(state);
  }, [state, storage]);

  return [state, setState];
}
