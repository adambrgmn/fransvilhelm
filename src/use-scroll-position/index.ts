import { useWindowSubscription } from '../use-event-listener';
import { canUseDOM } from '../utils';

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true;
      return true;
    },
  });

  if (canUseDOM()) {
    window.addEventListener('testPassive', () => {}, opts);
    window.removeEventListener('testPassive', () => {}, opts);
  }
} catch (e) {}

/**
 * Keep track of window scroll position while the user scrolls.
 * Optionally you can pass in a throttle wrapper to throttle the update calls (
 * e.g. using [lodash.throttle](https://www.npmjs.com/package/lodash.throttle)
 * or window.requestAnimationFrame).
 *
 * @param throttleWrapper Optional wrapper function useful to throttle calls
 * @returns Current scroll position
 *
 * @example
 *   const throttler = fn => _.throttle(fn, 100);
 *   const Message = () => {
 *     const pos = useScrollPosition(throttler);
 *     const message = pos > 1000 ? 'Yeah, you made it down here!' : '...';
 *     return <p>{message}</p>
 *   }
 */
export function useScrollPosition(): ScrollPosition {
  const position = useWindowSubscription(
    'scroll',
    getPosition,
    supportsPassive ? { passive: true } : false,
  );

  return position;
}

function getPosition(): ScrollPosition {
  return {
    x: canUseDOM() ? window.pageXOffset : 0,
    y: canUseDOM() ? window.pageYOffset : 0,
  };
}

interface ScrollPosition {
  x: number;
  y: number;
}
