import * as React from 'react';
import { useCheckbox } from './';

const UseCheckboxExample = (): JSX.Element => {
  const checkbox = useCheckbox();
  return (
    <React.Fragment>
      <input type="checkbox" id="checkbox" {...checkbox} />
      <label htmlFor="checkbox">Check me!</label>
    </React.Fragment>
  );
};

export { UseCheckboxExample };
