import * as React from 'react';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDebounce } from './';
import { useInput } from '../use-input';

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

it('should debounce a value and only update once within the given delay', async () => {
  jest.useFakeTimers();
  render(<TestComponent delay={100} />);
  const debouncedValue = screen.getByTestId('debounced');
  const input = screen.getByTestId('input');

  const inputs = ['a', 'ab', 'abc'];
  inputs.forEach((value, index) => {
    setTimeout(() => {
      userEvent.type(input, value);
    }, 50 * (index + 1));
  });

  advanceByTime(100);
  expect(debouncedValue).toBeEmptyDOMElement();

  advanceByTime(100);
  expect(debouncedValue).toBeEmptyDOMElement();

  advanceByTime(100);
  expect(debouncedValue).toHaveTextContent('abc');
});
