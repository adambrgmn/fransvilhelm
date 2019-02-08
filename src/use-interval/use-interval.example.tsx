import * as React from 'react';
import { useInterval } from './';

const UseIntervalExample = (): JSX.Element => {
  const [run, setRun] = React.useState(false);
  const [count, setCount] = React.useState(0);

  useInterval(() => setCount(count + 1), run ? 1000 : null);

  return (
    <div>
      <button onClick={() => setRun(!run)}>{run ? 'Pause' : 'Play'}</button>{' '}
      <output>{count}</output>
    </div>
  );
};

export { UseIntervalExample };
