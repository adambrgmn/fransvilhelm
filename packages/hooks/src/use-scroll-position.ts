import { useState, useEffect } from 'react';

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    },
  });

  window.addEventListener('testPassive', () => {}, opts);
  window.removeEventListener('testPassive', () => {}, opts);
} catch (e) {}

type ThrottleWrapper = (fn: () => void) => () => void;
const passThrough: ThrottleWrapper = fn => () => fn();

const getPosition = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset,
});

/**
 * Keep track of window scroll position while the user scrolls.
 * Optionally you can pass in a throttle wrapper to throttle the update calls (
 * e.g. using [lodash.throttle](https://www.npmjs.com/package/lodash.throttle)
 * or window.requestAnimationFrame).
 *
 * @example
 *   const throttler = fn => () => window.requestAnimationFrame(fn);
 *   const pos = useScrollPosition(throttler);
 *
 * @param {ThrottleWrapper} [throttleWrapper=passThrough] A wrapper function to throttle the update calls
 * @returns {{ x: number; y: number }}
 */
const useScrollPosition = (
  throttleWrapper: ThrottleWrapper = passThrough,
): { x: number; y: number } => {
  const [position, setPosition] = useState(getPosition());

  useEffect(() => {
    const listener = throttleWrapper(() => setPosition(getPosition()));

    window.addEventListener(
      'scroll',
      listener,
      supportsPassive ? { passive: true } : false,
    );

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return position;
};

export { useScrollPosition, ThrottleWrapper };
