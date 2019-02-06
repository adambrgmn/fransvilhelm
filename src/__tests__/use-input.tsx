import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { useInput } from '../use-input';

afterEach(cleanup);

const TestComponent = () => {
  const input = useInput();
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