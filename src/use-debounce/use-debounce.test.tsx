import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup, fireEvent, act } from 'react-testing-library';
import { useDebounce } from './';
import { useInput } from '../use-input';

afterEach(cleanup);

const advanceByTime = (time: number): void => {
  act(() => {
    jest.advanceTimersByTime(time);
  });
};

const TestComponent = ({ delay }: { delay: number }): JSX.Element => {
  const input = useInput('');
  const debouncedValue = useDebounce(input.value, delay);

  return (
    <div>
      <p data-testid="debounced">{debouncedValue}</p>
      <input type="text" data-testid="input" {...input} />
    </div>
  );
};

it('should debounce a value and only update once within the given delay', () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<TestComponent delay={100} />);
  const debouncedValue = getByTestId('debounced');
  const input = getByTestId('input');

  const inputs = ['a', 'ab', 'abc'];
  inputs.forEach((value, index) => {
    setTimeout(() => {
      fireEvent.change(input, { target: { value } });
    }, 50 * (index + 1));
  });

  advanceByTime(100);
  expect(debouncedValue).toHaveTextContent('');

  advanceByTime(100);
  expect(debouncedValue).toHaveTextContent('');

  advanceByTime(100);
  expect(debouncedValue).toHaveTextContent('abc');
});