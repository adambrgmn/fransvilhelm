import { useRef, useLayoutEffect, useState, useCallback } from 'react';

interface UseDimensionsResult<T extends Element> {
  ref: React.RefObject<T>;
  rect: ClientRect | null;
}

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
 * @returns {UseDimensionsResult<T>} An object containing a ref object to
 *          attatch to an element and a (possibly null) rect object with
 *          measurements
 *
 * @example
 *   import { useDimensions } from '@fransvilhelm/hooks';
 *
 *   const Square = () => {
 *     const { ref, rect } = useDimensions();
 *     const { width, height } = rect | {};
 *     return <div ref={ref}>{width}x{height}px</div>;
 *   };
 */
const useDimensions = <T extends Element>(): UseDimensionsResult<T> => {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<ClientRect | null>(null);

  const handleResize = useCallback(() => {
    if (ref.current != null) {
      const clientRect = ref.current.getBoundingClientRect();
      setRect(clientRect);
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (ref.current == null) return;
    handleResize();

    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(entries => {
        entries.forEach(({ target, contentRect }) => {
          if (target === ref.current) setRect(contentRect);
        });
      });

      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    } else {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [ref, handleResize]);

  return { ref, rect };
};

export { useDimensions };
