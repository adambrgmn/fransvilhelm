import * as React from 'react';
import { useKeypress } from '../../use-keypress';

const Indicator = ({ pressed }: { pressed: boolean }): JSX.Element => (
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

const UseKeypressExample = (): JSX.Element => {
  const keys: { [key: string]: boolean } = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: useKeypress(key),
      };
    }, {});

  return (
    <div>
      <ul>
        {Object.keys(keys).map(key => (
          <li key={key}>
            <code>
              {key}: <Indicator pressed={keys[key]} />
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UseKeypressExample };
