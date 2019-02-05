import { useRef, useEffect, MutableRefObject } from 'react';

/**
 * Setup an interval playing nicely with the hooks api.
 * The implementation is shamelessly copied from
 * [Dan Abramov](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).
 *
 * @param {Function} callback Callback to be executed on each tick
 * @param {(number | null)} delay Interval delay
 */
const useInterval = (callback: () => any, delay: number | null): void => {
  const savedCallback: MutableRefObject<() => any> = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay != null) {
      const tick = () => savedCallback.current();
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export { useInterval };
