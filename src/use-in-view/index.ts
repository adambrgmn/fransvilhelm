import { useState, RefObject } from 'react';

import { useIsomorphicLayoutEffect } from '../utils';

/**
 * Determine if an element is currently in the viewport or not using
 * IntersectionObserver.
 *
 * **Note:** This uses the IntersectionObserver API which is not available in
 * all browsers yet, so you might want to polyfill it before using this hook.
 *
 * @param ref A RefObject attached to an element
 * @param options Options applied to the new IntersectionObserver
 * @returns Boolean indicating if the element is in view or not
 */
const useInView = <E extends Element>(
  ref: RefObject<E>,
  options?: IntersectionObserverInit | undefined,
): boolean => {
  const [inView, setInView] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const current = ref.current;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === current) setInView(entry.isIntersecting);
        });
      }, options);

      observer.observe(current);
      return () => {
        observer.unobserve(current);
      };
    }
  }, [ref, options]);

  return inView;
};

export { useInView };
