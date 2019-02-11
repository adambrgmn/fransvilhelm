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
 * @param {string} [rootMargin='0px'] Root margins to determine the bounding box
 * @returns {boolean} If the element is in view or not
 */
const useInView = <E extends Element>(
  ref: RefObject<E>,
  options?: IntersectionObserverInit | undefined,
): boolean => {
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === ref.current) setInView(entry.isIntersecting);
      });
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref.current, options]);

  return inView;
};

export { useInView };
