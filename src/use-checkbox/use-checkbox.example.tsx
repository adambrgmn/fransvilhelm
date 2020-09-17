import * as React from 'react';

import { useCheckbox } from './';

const UseCheckboxExample: React.FC = () => {
  const checkbox = useCheckbox();
  return (
    <React.Fragment>
      <input
        type="checkbox"
        id="checkbox"
        checked={checkbox.checked}
        onChange={checkbox.onChange}
      />
      <label htmlFor="checkbox">Check me!</label>
    </React.Fragment>
  );
};

export { UseCheckboxExample };
