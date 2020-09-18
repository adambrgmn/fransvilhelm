import { DependencyList, EffectCallback, useEffect } from 'react';
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

export { useDeepEqualEffect };
