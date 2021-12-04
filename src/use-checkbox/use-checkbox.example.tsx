import { Fragment } from 'react';

import { useCheckbox } from './';

const UseCheckboxExample: React.FC = () => {
  const checkbox = useCheckbox();
  return (
    <Fragment>
      <input
        type="checkbox"
        id="checkbox"
        checked={checkbox.checked}
        onChange={checkbox.onChange}
      />
      <label htmlFor="checkbox">Check me!</label>
    </Fragment>
  );
};

export { UseCheckboxExample };
