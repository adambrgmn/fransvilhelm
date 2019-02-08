import * as React from 'react';
import { useOnline } from './';

const UseOnlineExample = (): JSX.Element => {
  const online = useOnline();
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            width: '0.5em',
            height: '0.5em',
            marginRight: '0.5em',
            borderRadius: '100%',
            backgroundColor: online ? 'green' : 'red',
          }}
        />{' '}
        {online ? 'connected' : 'disconnected'}
      </div>
      <div>Use the developer tools network-tab to force an offline state</div>
    </div>
  );
};

export { UseOnlineExample };
