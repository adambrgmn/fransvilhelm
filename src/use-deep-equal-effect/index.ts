import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import isEqual from 'react-fast-compare';

import { usePrevious } from '../use-previous';

const useDeepEqualEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const previousDeps = usePrevious(deps);

  useEffect(() => {
    if (deps == null || !isEqual(deps, previousDeps)) {
      return effect();
    }
  });
};

const useDeepEqualLayoutEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
) => {
  const previousDeps = usePrevious(deps);

  useLayoutEffect(() => {
    if (deps == null || !isEqual(deps, previousDeps)) {
      return effect();
    }
  });
};

export { useDeepEqualEffect, useDeepEqualLayoutEffect };
