import { useLayoutEffect, useEffect } from 'react';

export function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const useIsomorphicLayoutEffect = canUseDOM()
  ? useLayoutEffect
  : useEffect;
