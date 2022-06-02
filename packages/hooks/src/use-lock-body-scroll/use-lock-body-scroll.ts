import { RefObject } from 'react';

import { useIsomorphicLayoutEffect } from '../utils';

/**
 * Will lock body and prevent it from being scrolled. Useful when showing a
 * modal or anything else when you don't want the user to be able to scroll the
 * body. From [useHooks](https://usehooks.com/useLockBodyScroll/).
 *
 * @param lock Optional value if you want to lock body or not. Defaults to `true`
 *
 * @example
 *   import { useLockBodyScroll } from '@fransvilhelm/hooks';
 *
 *   const Modal = () => {
 *     useLockBodyScroll();
 *     return (
 *       <div>
 *         <h2>Tips!</h2>
 *       </div>
 *     );
 *   }
 */
export function useLockBodyScroll(lock: boolean = true, ref?: RefObject<HTMLElement>): void {
  useIsomorphicLayoutEffect(() => {
    let el = ref?.current ?? document.body;

    if (lock) {
      let previousValue = el.style.overflow || 'visible';
      el.style.overflow = 'hidden';
      return () => {
        el.style.overflow = previousValue;
      };
    }
  }, [lock, ref]);
}
