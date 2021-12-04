import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import isEqual from 'react-fast-compare';

import { usePrevious } from './use-previous';

/**
 * Use `useDeepEqualEffect` when react normal dependecy compare feature doesn't
 * do it. This hook is used in the same way as `useEffect` but will do a deeper
 * equality check on the dependecy array than React's version.

 * @param effect Effect to run when deps are not deeply equal
 * @param deps Dependecies that, when changed, will trigger effect
 */
export function useDeepEqualEffect(
  effect: EffectCallback,
  deps?: DependencyList,
) {
  const previousDeps = usePrevious(deps);

  useEffect(() => {
    if (deps == null || !isEqual(deps, previousDeps)) {
      return effect();
    }
  });
}

/**
 * Use `useDeepEqualLayoutEffect` when react normal dependecy compare feature
 * doesn't do it. This hook is used in the same way as `useLayoutEffect` but
 * will do a deeper equality check on the dependecy array than React's version.

 * @param effect Effect to run when deps are not deeply equal
 * @param deps Dependecies that, when changed, will trigger effect
 */
export function useDeepEqualLayoutEffect(
  effect: EffectCallback,
  deps?: DependencyList,
) {
  const previousDeps = usePrevious(deps);

  useLayoutEffect(() => {
    if (deps == null || !isEqual(deps, previousDeps)) {
      return effect();
    }
  });
}
