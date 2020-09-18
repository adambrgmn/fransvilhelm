import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDeepEqualEffect } from './';
import { useInput } from '../use-input';

const TestComponent: React.FC<{ effect: () => void }> = ({ effect }) => {
  const input = useInput('');
  const [, forceUpdate] = React.useState<any>();

  useDeepEqualEffect(() => effect(), [{ value: input.value }]);

  return (
    <div>
      <input {...input} />
      <button onClick={() => forceUpdate({})}>Force update</button>
    </div>
  );
};

it('should only run effect if dependencies are on deeply equal', () => {
  const effect = jest.fn();
  render(<TestComponent effect={effect} />);

  let input = screen.getByRole('textbox');
  let force = screen.getByRole('button');

  userEvent.click(force);
  userEvent.click(force);
  expect(effect).toHaveBeenCalledTimes(1);

  fireEvent.change(input, { target: { value: 'hello' } });
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(effect).toHaveBeenCalledTimes(2);
});
