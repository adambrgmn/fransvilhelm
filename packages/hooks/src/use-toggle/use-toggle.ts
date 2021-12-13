import { useCallback, useState } from 'react';

export function useToggle(initialValue: boolean | (() => boolean) = false) {
  let [state, setState] = useState(initialValue);
  let toggle = useCallback(() => setState((prev) => !prev), []);
  return [state, toggle] as const;
}
