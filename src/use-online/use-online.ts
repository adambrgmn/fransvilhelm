import { useState } from 'react';

import { useEventListener } from '../use-event-listener';

const getInitialStatus = (): boolean => {
  return typeof navigator !== 'undefined' &&
    typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
};

/**
 * Determine if the client is online or offline and update the value if the
 * state changes.
 *
 * @returns `true` if connected to internet, `false` otherwise
 *
 * @example
 *   const Status = () => {
 *     const isOnline = useOnline();
 *     const color = isOnline ? 'green' : 'red';
 *     const label = isOnline ? 'Connected' : 'Disconnected';
 *     return <p style={{ color }}>{label}</p>;
 *   }
 */
export function useOnline(): boolean {
  const [online, setOnline] = useState(getInitialStatus());

  useEventListener('online', () => setOnline(true));
  useEventListener('offline', () => setOnline(false));

  return online;
}
