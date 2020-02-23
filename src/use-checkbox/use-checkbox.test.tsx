import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { useCheckbox } from './';

afterEach(cleanup);

const TestComponent: React.FC<{ onChange?: () => void }> = ({
  onChange,
}): JSX.Element => {
  const checkbox = useCheckbox(false, onChange);
  return (
    <div>
      <p data-testid="result">Checked: {checkbox.checked ? 'true' : 'false'}</p>
      <input type="checkbox" data-testid="checkbox" {...checkbox} />
    </div>
  );
};

it('should provide checked value and onChange handler for a checkbox', () => {
  const { getByTestId } = render(<TestComponent />);
  const result = getByTestId('result');
  const checkbox = getByTestId('checkbox');

  expect(result).toHaveTextContent('Checked: false');

  fireEvent.click(checkbox);
  expect(result).toHaveTextContent('Checked: true');
});

it('accepts a onChange callback', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<TestComponent onChange={onChange} />);
  const checkbox = getByTestId('checkbox');
  fireEvent.click(checkbox);

  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith(true);
});
