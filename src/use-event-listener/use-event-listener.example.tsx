import * as React from 'react';

import { useEventListener } from './';

const UseEventListenerExample = (): JSX.Element => {
  const [keys, setKeys] = React.useState<string[]>([]);
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
