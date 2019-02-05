import { useState, useEffect } from 'react';

/**
 * Determine if the client is online or offline and update the value if the
 * state changes.
 *
 * @returns {boolean} isOnline
 */
const useOnline = (): boolean => {
  const [online, setOnline] = useState(!!navigator.onLine);

  useEffect(() => {
    const listener = () => setOnline(navigator.onLine);

    window.addEventListener('online', listener);
    window.addEventListener('offline', listener);

    return () => {
      window.removeEventListener('online', listener);
      window.removeEventListener('offline', listener);
    };
  });

  return online;
};

export { useOnline };
