import { useRef, useState } from 'react';

import { observeRect, useIsomorphicLayoutEffect } from './utils';

/**
 * Get the current measurements of an element in the document. It will also
 * listen for resize changes.
 *
 * @param ref React ref object containing an Element
 * @param observe Boolean flag indicating wether to observe changes or not
 * @param callback Callback function fired each time an objects dimension changes
 * @returns A (possibly null) DOMRect object with measurements
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
export function useDimensions(
  ref: React.RefObject<Element>,
  observe?: boolean,
  callback?: (rect: DOMRect) => void,
): DOMRect | null {
  const [element, setElement] = useState(ref.current);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const initialRectSet = useRef(false);
  const initialRefSet = useRef(false);
  const callbackRef = useRef<typeof callback>(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
    if (ref.current !== element) {
      setElement(ref.current);
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (element && !initialRectSet.current) {
      initialRectSet.current = true;
      setRect(element.getBoundingClientRect());
    }
  }, [element]);

  useIsomorphicLayoutEffect(() => {
    let observer: ReturnType<typeof observeRect>;
    let elem = element;

    const cleanup = () => {
      observer && observer.unobserve();
    };

    if (!initialRefSet.current) {
      initialRefSet.current = true;
      elem = ref.current;
    }

    if (!elem) {
      return cleanup;
    }

    observer = observeRect(elem, (rect) => {
      callbackRef.current && callbackRef.current(rect);
      setRect(rect);
    });

    observe && observer.observe();

    return cleanup;
  }, [observe, element]);

  return rect;
}
