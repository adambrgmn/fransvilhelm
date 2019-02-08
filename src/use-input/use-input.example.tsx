import * as React from 'react';
import { useInput } from './';

const UseInputExample = (): JSX.Element => {
  const input = useInput('Hi, friend!');
  return (
    <div>
      <label htmlFor="input">Greeting:</label> <input type="text" {...input} />
    </div>
  );
};

export { UseInputExample };
