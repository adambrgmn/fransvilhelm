import { useState, useEffect } from 'react';

const getInitialStatus = () => {
  return typeof navigator !== 'undefined' &&
    typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;
};

/**
 * Determine if the client is online or offline and update the value if the
 * state changes.
 *
 * @returns {boolean} isOnline
 */
const useOnline = (): boolean => {
  const [online, setOnline] = useState(getInitialStatus());

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

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
