import * as React from 'react';
import { useInput } from '../use-input';
import { usePrevious } from './';

const UsePreviousExample: React.FC = () => {
  const input = useInput('');
  const previous = usePrevious(input.value);
  return (
    <div>
      <label>
        <span>Your name:</span>
        <input type="text" {...input} />
      </label>
      <div>Previous: {previous}</div>
    </div>
  );
};

export { UsePreviousExample };
