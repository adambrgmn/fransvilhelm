import React from 'react';

import { useInput } from './';

const UseInputExample: React.FC = () => {
  const input = useInput('Hi, friend!');
  return (
    <div>
      <label htmlFor="input">Greeting:</label> <input type="text" {...input} />
    </div>
  );
};

export { UseInputExample };
