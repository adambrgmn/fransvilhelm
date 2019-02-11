import * as React from 'react';
import { useLocalStorage } from './';

const Counter = (): JSX.Element => {
  const [count, setCount] = useLocalStorage(0, 'persisted-count');
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <output>{count}</output>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

const UseLocalStorageExample = (): JSX.Element => {
  return (
    <div>
      <p>
        Open this same page in another tab and increase or decrease the counter
        and see how this is emitted between pages.
      </p>
      <p>
        Also the counters below share the same persisted state and changes to
        one component will be emitted to an other component using the same key.
      </p>
      <p>And if you refresh the page, the last count will be persisted.</p>
      <Counter />
      <Counter />
    </div>
  );
};

export { UseLocalStorageExample };
