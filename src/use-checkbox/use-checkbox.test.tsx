import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useCheckbox } from './';

const TestComponent: React.FC<{
  onChange?: () => void;
  initialValue?: boolean;
}> = ({ initialValue, onChange }): JSX.Element => {
  const checkbox = useCheckbox(initialValue, onChange);
  return (
    <div>
      <p data-testid="result">Checked: {checkbox.checked ? 'true' : 'false'}</p>
      <input type="checkbox" data-testid="checkbox" {...checkbox} />
    </div>
  );
};

it('should provide checked value and onChange handler for a checkbox', () => {
  render(<TestComponent initialValue={false} />);
  const result = screen.getByTestId('result');
  const checkbox = screen.getByTestId('checkbox');

  expect(result).toHaveTextContent('Checked: false');

  userEvent.click(checkbox);
  expect(result).toHaveTextContent('Checked: true');
});

it('accepts a onChange callback', () => {
  const onChange = jest.fn();
  render(<TestComponent onChange={onChange} />);
  const checkbox = screen.getByTestId('checkbox');
  userEvent.click(checkbox);

  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith(true);
});

it('accepts an initial value', () => {
  render(<TestComponent initialValue={true} />);
  const result = screen.getByTestId('result');

  expect(result).toHaveTextContent('Checked: true');
});
