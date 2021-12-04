import { useRef, useEffect, MutableRefObject } from 'react';

/**
 * Setup an interval playing nicely with the hooks api.
 * The implementation is shamelessly copied from
 * [Dan Abramov](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).
 *
 * @param callback Callback to be executed on each tick
 * @param delay Interval delay
 *
 * @example
 *   const Counter = () => {
 *     const [count, setCount] = useState(0);
 *     useInterval(() => setCount(count + 1));
 *
 *     return <p>{count} seconds have passed</p>;
 *   };
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback: MutableRefObject<() => void> = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay != null) {
      const tick = (): void => savedCallback.current();
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
