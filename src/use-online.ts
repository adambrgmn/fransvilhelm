import { useState, useEffect } from 'react';

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
 * @returns {boolean} True if connected to internet, false otherwise
 *
 * @example
 *   const Status = () => {
 *     const isOnline = useOnline();
 *     const color = isOnline ? 'green' : 'red';
 *     const label = isOnline ? 'Connected' : 'Disconnected';
 *     return <p style={{ color }}>{label}</p>;
 *   }
 */
const useOnline = (): boolean => {
  const [online, setOnline] = useState(getInitialStatus());

  useEffect(() => {
    const goOnline = (): void => setOnline(true);
    const goOffline = (): void => setOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return online;
};

export { useOnline };
