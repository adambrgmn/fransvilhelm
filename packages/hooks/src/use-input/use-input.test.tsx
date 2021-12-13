import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useInput } from './use-input';

const TestComponent: React.FC<{ onChange?: () => void }> = ({ onChange }) => {
  const input = useInput('', onChange);
  return (
    <div>
      <p data-testid="result">{input.value}</p>
      <input data-testid="input" {...input} />
    </div>
  );
};

it('should provide an input value and onChange handler', () => {
  render(<TestComponent />);
  const result = screen.getByTestId('result');
  const input = screen.getByTestId('input');

  userEvent.type(input, 'Jane Doe');
  expect(result).toHaveTextContent('Jane Doe');
});

it('accepts an onChange handler', () => {
  const onChange = jest.fn();
  render(<TestComponent onChange={onChange} />);
  const input = screen.getByTestId('input');

  userEvent.type(input, 'Jane Doe');
  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith('Jane Doe');
});
