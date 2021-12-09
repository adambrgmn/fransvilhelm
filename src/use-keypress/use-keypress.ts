import { useState } from 'react';

import { useEventListener } from '../use-event-listener';

/**
 * Checks if a key is pressed or not
 *
 * @param key The key to look for
 * @returns {boolean} true if key is down, false otherwise
 */
export function useKeypress(key: string): boolean {
  const [pressing, setPressing] = useState(false);

  const keydownHandler = (event: KeyboardEvent) => {
    if (event.key === key) setPressing(true);
  };

  const keyupHandler = (event: KeyboardEvent) => {
    if (event.key === key) setPressing(false);
  };

  useEventListener('keydown', keydownHandler);
  useEventListener('keyup', keyupHandler);

  return pressing;
}
