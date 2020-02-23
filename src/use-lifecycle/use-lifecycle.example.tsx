import * as React from 'react';
import { useMount, useUpdate, useUnmount } from './';

const Example: React.FC = () => {
  const [count, setCount] = React.useState(0);
  useMount(() => console.log('Mount', { count }));
  useUpdate(() => console.log('Update', { count }));
  useUnmount(() => console.log('Unmount', { count }));

  return (
    <p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </p>
  );
};

const UseLifecycleExample: React.FC = () => {
  const [key, setKey] = React.useState(0);
  return (
    <div>
      <p>
        <em>Check console for logs of the lifecycle events.</em>
        <button onClick={() => setKey(key + 1)}>Force remount</button>
      </p>
      <Example key={key} />
    </div>
  );
};

export { UseLifecycleExample };
