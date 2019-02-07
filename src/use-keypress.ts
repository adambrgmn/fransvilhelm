import { useState, useEffect } from 'react';

const useKeypress = (key: string): boolean => {
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent): void => {
      if (event.key === key) setPressing(true);
    };

    const upHandler = (event: KeyboardEvent): void => {
      if (event.key === key) setPressing(false);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [key]);

  return pressing;
};

export { useKeypress };