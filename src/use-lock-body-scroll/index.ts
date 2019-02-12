import { useLayoutEffect, useRef, RefObject } from 'react';

/**
 * Will lock body and prevent it from being scrolled. Useful when showing a
 * modal or anything else when you don't want the user to be able to scroll the
 * body. From [useHooks](https://usehooks.com/useLockBodyScroll/).
 *
 * @param {boolean} [lock=true] Optional value if you want to lock body or not
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
const useLockBodyScroll = (
  lock: boolean = true,
  ref: RefObject<HTMLElement> = useRef(document.body),
): void => {
  useLayoutEffect(() => {
    if (!ref.current) return;
    if (lock) {
      const previousValue = ref.current.style.overflow || 'visible';
      ref.current.style.overflow = 'hidden';
      return () => {
        if (!ref.current) return;
        ref.current.style.overflow = previousValue;
      };
    }
  }, [lock, ref]);
};

export { useLockBodyScroll };
