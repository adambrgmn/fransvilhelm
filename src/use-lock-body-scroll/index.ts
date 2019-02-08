import { useLayoutEffect } from 'react';

/**
 * Will lock body and prevent it from being scrolled. Useful when showing a
 * modal or anything else when you don't want the user to be able to scroll the
 * body. From [useHooks](https://usehooks.com/useLockBodyScroll/).
 *
 * @param {boolean} [lock=true] Optional value if you want to lock body or not
 *
 * @example
 *   import { useLockBodyScroll } from '@adambrgmn/hooks';
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
const useLockBodyScroll = (lock: boolean = true): void => {
  useLayoutEffect(() => {
    if (lock) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'visible';
      };
    }
  }, [lock]);
};

export { useLockBodyScroll };
