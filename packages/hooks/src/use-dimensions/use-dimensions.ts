import { useRef, useState } from 'react';

import { observeRect, useIsomorphicLayoutEffect } from '../utils';

type PossibleNode = null | undefined | HTMLElement | SVGElement;

export type PRect = Partial<DOMRect> & {
  readonly bottom: number;
  readonly height: number;
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly width: number;
};

/**
 * Get the current measurements of an element in the document. It will also
 * listen for resize changes.
 *
 * @param ref React ref object containing an Element
 * @param observe Boolean flag indicating wether to observe changes or not
 * @param callback Callback function fired each time an objects dimension changes
 * @returns A (possibly null) PRect object with measurements
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
  ref: React.RefObject<PossibleNode>,
  observe?: boolean,
  callback?: (rect: PRect) => void,
): PRect | null {
  const [element, setElement] = useState(ref.current);
  const [rect, setRect] = useState<PRect | null>(null);
  const initialRectSet = useRef(false);
  const initialRefSet = useRef(false);
  const callbackRef = useRef<typeof callback>(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
    if (ref.current !== element) {
      setElement(ref.current);
    }
  }, [callback, element, ref]);

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
  }, [observe, element, ref]);

  return rect;
}
