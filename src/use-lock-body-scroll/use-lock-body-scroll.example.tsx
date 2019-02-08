import * as React from 'react';
import { useCheckbox } from '../../use-checkbox';
import { useLockBodyScroll } from './';

const UseLockBodyScrollExample = (): JSX.Element => {
  const checkbox = useCheckbox(false);
  useLockBodyScroll(checkbox.checked);

  return (
    <div>
      <input type="checkbox" id="checkbox" {...checkbox} />{' '}
      <label htmlFor="checkbox">Lock body scroll</label>
    </div>
  );
};

export { UseLockBodyScrollExample };
