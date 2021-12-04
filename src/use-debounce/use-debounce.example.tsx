import React from 'react';

import { useInput } from '../use-input';
import { useDebounce } from './';

const UseDebounceExample: React.FC = () => {
  const input = useInput('hello world');
  const debouncedValue = useDebounce(input.value, 1000);

  return (
    <div>
      <input type="text" {...input} />
      <p>
        This only updates once every second: <code>{debouncedValue}</code>
      </p>
    </div>
  );
};

export { UseDebounceExample };
