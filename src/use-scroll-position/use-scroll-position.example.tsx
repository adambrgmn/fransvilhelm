import React from 'react';

import { useScrollPosition } from './';

const WithoutThrottler: React.FC = () => {
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

const UseScrollPositionExample: React.FC = () => {
  return (
    <div>
      <p>
        There will not be that much difference. But if other heavy computations
        are made in parallell the throttler can be useful.
      </p>
      <WithoutThrottler />
    </div>
  );
};

export { UseScrollPositionExample };
