import { useState } from 'react';

import { useEventListener } from './';

const UseEventListenerExample: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  useEventListener('keypress', (ev) => {
    setKeys([...keys, ev.key]);
  });

  return (
    <div>
      <strong>Press any keys: </strong>
      <output>{keys.join(' > ')}</output>
    </div>
  );
};

export { UseEventListenerExample };
