import * as React from 'react';
import { useScrollPosition } from './';

// eslint-disable-next-line
const throttler = (fn: () => void) => () => window.requestAnimationFrame(fn);

const WithThrottler = (): JSX.Element => {
  const { x, y } = useScrollPosition(throttler);
  return (
    <div>
      <span>With requestAnimationFrame as throttler: </span>
      <strong>
        x: {x}px / y: {y}px
      </strong>
    </div>
  );
};

const WithoutThrottler = (): JSX.Element => {
  const { x, y } = useScrollPosition();
  return (
    <div>
      <span>Without any throttling function: </span>
      <strong>
        x: {x}px / y: {y}px
      </strong>
    </div>
  );
};

const UseScrollPositionExample = (): JSX.Element => {
  return (
    <div>
      <p>
        There will not be that much difference. But if other heavy computations
        are made in parallell the throttler can be useful.
      </p>
      <WithThrottler />
      <WithoutThrottler />
    </div>
  );
};

export { UseScrollPositionExample };
