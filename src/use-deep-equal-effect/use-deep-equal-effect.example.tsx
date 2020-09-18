import * as React from 'react';

import { useDeepEqualEffect } from './';

const UseDeepEqualEffectExample: React.FC = () => {
  const [state, forceUpdate] = React.useState({});

  useDeepEqualEffect(() => {
    console.log('Updated');
  }, [state]);

  return (
    <button type="button" onClick={() => forceUpdate({})}>
      Force update
    </button>
  );
};

export { UseDeepEqualEffectExample };
