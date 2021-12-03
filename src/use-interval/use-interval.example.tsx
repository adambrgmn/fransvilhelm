import { useState } from 'react';

import { useInterval } from './';

const UseIntervalExample = (): JSX.Element => {
  const [run, setRun] = useState(false);
  const [count, setCount] = useState(0);

  useInterval(() => setCount(count + 1), run ? 1000 : null);

  return (
    <div>
      <button onClick={() => setRun(!run)}>{run ? 'Pause' : 'Play'}</button>{' '}
      <output>{count}</output>
    </div>
  );
};

export { UseIntervalExample };
