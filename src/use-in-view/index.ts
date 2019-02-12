import { useState, RefObject, useLayoutEffect } from 'react';

/**
 * Determine if an element is currently in the viewport or not using
 * IntersectionObserver.
 *
 * **Note:** This uses the IntersectionObserver API which is not available in
 * all browsers yet, so you might want to polyfill it before using this hook.
 *
 * @template E extends Element
 * @param {RefObject<E>} ref A RefObject attached to an element
 * @param {IntersectionObserverInit | undefined} options Options applied to the new IntersectionObserver
 * @returns {boolean} If the element is in view or not
 */
const useInView = <E extends Element>(
  ref: RefObject<E>,
  options?: IntersectionObserverInit | undefined,
): boolean => {
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    if (ref.current) {
      const current = ref.current;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.target === current) setInView(entry.isIntersecting);
        });
      }, options);

      observer.observe(current);
      return () => {
        observer.unobserve(current);
      };
    }
  }, [ref.current, options]);

  return inView;
};

export { useInView };
