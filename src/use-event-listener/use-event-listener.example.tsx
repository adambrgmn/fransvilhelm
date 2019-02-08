import * as React from 'react';
import { useEventListener } from './';

const UseEventListenerExample = (): JSX.Element => {
  const [keys, setKeys] = React.useState<string[]>([]);
  useEventListener('keypress', ev => {
    setKeys([...keys, ev.key]);
  });

  return <output>{keys.join(' > ')}</output>;
};

export { UseEventListenerExample };
