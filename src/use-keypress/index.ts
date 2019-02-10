import { useState, useCallback } from 'react';
import { useEventListener } from '../use-event-listener';

/**
 * Checks if a key is pressed or not
 *
 * @param {string} key The key to look for
 * @returns {boolean} true if key is down, false otherwise
 */
const useKeypress = (key: string): boolean => {
  const [pressing, setPressing] = useState(false);
  const deps = [key];

  const keydownHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === key) setPressing(true);
  }, deps);

  const keyupHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === key) setPressing(false);
  }, deps);

  useEventListener('keydown', keydownHandler);
  useEventListener('keyup', keyupHandler);

  return pressing;
};

export { useKeypress };
