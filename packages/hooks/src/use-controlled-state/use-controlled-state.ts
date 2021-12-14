import { useRef, useState, useCallback } from 'react';

import { SetState, UseStateTuple } from '../types';

/**
 * `useControlledState` can be used as a proxy to ensure that some kind of state
 * is always handled. If the hook is given a not `undefined` value state will be
 * treated as controlled and calls to `setState` will not affect the internal
 * state. Instead the provided state handler should deal with updating its state.
 * But if `undefined` is provided the internal state will be used instead.
 *
 * @param controlledValue Value that indicates if the state should be controlled or not
 * @param defaultValue Initial default value if state should be controlled
 * @param onChange Change handler to be called whn controlled setState is called
 * @returns UseState tuple
 */
export function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T | (() => T),
  onChange: SetState<T> = () => {},
): UseStateTuple<T> {
  let [stateValue, setStateValue] = useState(defaultValue);
  let isControlled = useIsControlled(controlledValue);

  let state = isControlled ? controlledValue : stateValue;
  let setState: SetState<T> = useCallback(
    (next) => {
      if (!isControlled) {
        setStateValue(next);
      }

      onChange(next);
    },
    [isControlled, onChange],
  );

  return [state as T, setState];
}

function useIsControlled(controlledValue: unknown) {
  let wasControlledRef = useRef(controlledValue !== undefined);

  let wasControlled = wasControlledRef.current;
  let isControlled = controlledValue !== undefined;

  if (wasControlled !== isControlled) {
    let from = wasControlled ? 'controlled' : 'uncontrolled';
    let to = isControlled ? 'controlled' : 'uncontrolled';
    console.warn(`WARN: A component changed from ${from} to ${to}.`);
  }

  wasControlledRef.current = isControlled;

  return isControlled;
}
