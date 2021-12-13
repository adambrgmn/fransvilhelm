import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { advanceTimersByTime } from '../test-utils/jest';
import { useInput } from '../use-input';
import { useDebounce } from './use-debounce';

jest.useFakeTimers();

const TestComponent: React.FC<{ delay: number }> = ({ delay }) => {
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
  render(<TestComponent delay={100} />);
  const debouncedValue = screen.getByTestId('debounced');
  const input = screen.getByTestId('input');

  const inputs = ['a', 'ab', 'abc'];
  inputs.forEach((value, index) => {
    setTimeout(() => {
      userEvent.type(input, value);
    }, 50 * (index + 1));
  });

  advanceTimersByTime(100);
  expect(debouncedValue).toBeEmptyDOMElement();

  advanceTimersByTime(100);
  expect(debouncedValue).toBeEmptyDOMElement();

  advanceTimersByTime(100);
  expect(debouncedValue).toHaveTextContent('abc');
});
