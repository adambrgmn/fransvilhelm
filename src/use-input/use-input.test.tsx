import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { useInput } from './';

afterEach(cleanup);

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
  const { getByTestId } = render(<TestComponent />);
  const result = getByTestId('result');
  const input = getByTestId('input');

  fireEvent.change(input, { target: { value: 'Jane Doe' } });
  expect(result).toHaveTextContent('Jane Doe');
});

it('accepts an onChange handler', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<TestComponent onChange={onChange} />);
  const input = getByTestId('input');

  fireEvent.change(input, { target: { value: 'Jane Doe' } });
  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith('Jane Doe');
});
