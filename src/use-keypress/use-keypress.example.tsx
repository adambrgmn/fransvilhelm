import * as React from 'react';

import { useKeypress } from './';

const Indicator: React.FC<{ pressed: boolean }> = ({ pressed }) => (
  <span
    style={{
      display: 'inline-block',
      transform: `rotate(${pressed ? 180 : 0}deg)`,
      transition: 'transform 0.2s ease-in-out',
    }}
  >
    {'👆'}
  </span>
);

const Char = ({ char }: { char: string }) => {
  const pressed = useKeypress(char);
  return (
    <code>
      {char}: <Indicator pressed={pressed} />
    </code>
  );
};

const UseKeypressExample: React.FC = () => {
  const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div>
      <ul>
        {keys.map((key) => (
          <li key={key}>
            <Char char={key} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UseKeypressExample };
