import { useMemo } from 'react';
import { useSubscription, Subscription } from 'use-subscription';

/**
 * Get the current measurements of an element in the document. It will also
 * listen for resize changes. Note that it's most performant using
 * [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
 * but this api is not available in all browsers. In that case it will listen
 * for the resize-event on the window, but this will not take every type of
 * resize into account, since an element can be resized in other ways than that
 * the window gets resized. In that case you have to mock ResizeObserver.
 *
 * @template T extends Element
 * @returns {ClientRect | null} A (possibly null) rect object with measurements
 *
 * @example
 *   import { useDimensions } from '@fransvilhelm/hooks';
 *
 *   const Square = () => {
 *     const ref = useRef(null);
 *     const rect = useDimensions(ref);
 *     const { width, height } = rect | {};
 *     return <div ref={ref}>{width}x{height}px</div>;
 *   };
 */
const useDimensions = (ref: React.RefObject<Element>): ClientRect | null => {
  const subscription: Subscription<DOMRect | null> = useMemo(
    () => ({
      getCurrentValue: () => ref.current?.getBoundingClientRect() ?? null,
      subscribe: (callback) => {
        if ('ResizeObserver' in window) {
          const observer = new ResizeObserver((entries) => {
            entries.forEach(
              ({ target }) => target === ref.current && callback(),
            );
          });

          if (ref.current) observer.observe(ref.current);
          return () => {
            if (ref.current) observer.unobserve(ref.current);
            observer.disconnect();
          };
        }

        window.addEventListener('resize', callback);
        return () => window.removeEventListener('resize', callback);
      },
    }),
    [ref],
  );

  const rect = useSubscription(subscription);
  return rect;
};

export { useDimensions };
