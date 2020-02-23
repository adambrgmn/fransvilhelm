import { useWindowSubscription } from '../use-event-listener';

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
      return true;
    },
  });

  window.addEventListener('testPassive', () => {}, opts);
  window.removeEventListener('testPassive', () => {}, opts);
} catch (e) {}

const getPosition = (): { x: number; y: number } => ({
  x: window.pageXOffset,
  y: window.pageYOffset,
});

/**
 * Keep track of window scroll position while the user scrolls.
 * Optionally you can pass in a throttle wrapper to throttle the update calls (
 * e.g. using [lodash.throttle](https://www.npmjs.com/package/lodash.throttle)
 * or window.requestAnimationFrame).
 *
 * @param {ThrottleWrapper} [throttleWrapper=passThrough] Optional wrapper function useful to throttle calls
 * @returns {{ x: number; y: number }}
 *
 * @example
 *   const throttler = fn => _.throttle(fn, 100);
 *   const Message = () => {
 *     const pos = useScrollPosition(throttler);
 *     const message = pos > 1000 ? 'Yeah, you made it down here!' : '...';
 *     return <p>{message}</p>
 *   }
 */
const useScrollPosition = (): { x: number; y: number } => {
  const position = useWindowSubscription(
    'scroll',
    getPosition,
    supportsPassive ? { passive: true } : false,
  );

  return position;
};

export { useScrollPosition };
