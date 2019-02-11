import {
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { useEventListener } from '../use-event-listener';

interface StorageAdapter<S> {
  get(defaultValue: S | (() => S)): S;
  set(value: S): void;
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
  };
};

const globalStates = new Map<
  string,
  { callbacks: ((v: any) => void)[]; value: any }
>();

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
        state.callbacks.forEach(cb => {
          if (cb !== callback) cb(value);
        });

        globalStates.set(key, state);
      }
    },
    deregister: () => {
      const state = globalStates.get(key);
      if (state) {
        state.callbacks = state.callbacks.filter(cb => cb !== callback);
        globalStates.set(key, state);
      }
    },
  };
};

/**
 * Use persisted state as a drop in replacement for Reacts built-in hook
 * `useState`.
 *
 * By default it will use the key `local-storage-hook`. But you probably want to
 * set another key if you plan to use this hook on several places across your
 * application
 *
 * @template S The state value
 * @param {(S | (() => S))} initialState Default initial state, if non is found on `localStorage`
 * @param {string} [key='local-storage-hook'] Key to store value on
 * @returns {[S, Dispatch<SetStateAction<S>>]} Returns state and setState as an array tuple (same as `React.useState`)
 *
 * @example
 *   const PersistedCounter = () => {
 *     const [count, setCount] = usePersistedState(0, 'counter');
 *     return <button onClick={() => setCount(count + 1)}>{count}</button>;
 *   }
 */
const usePersistedState = <S>(
  initialState: S | (() => S),
  key: string = 'local-storage-hook',
): [S, Dispatch<SetStateAction<S>>] => {
  const globalState = useRef<GlobalState<S> | null>(null);
  const storage = useMemo(() => createStorageAdapter<S>(key), [key]);
  const [state, setState] = useState(() => storage.get(initialState));

  const storageListener = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        const nextState = JSON.parse(event.newValue);
        if (nextState !== state) setState(nextState);
      }
    },
    [key],
  );

  useEventListener('storage', storageListener);

  useEffect(() => {
    globalState.current = createGlobalState(key, setState, initialState);
    return () => {
      if (globalState.current) globalState.current.deregister();
    };
  }, []);

  useEffect(() => {
    storage.set(state);
    if (globalState.current) globalState.current.emit(state);
  }, [state]);

  return [state, setState];
};

export { usePersistedState };
