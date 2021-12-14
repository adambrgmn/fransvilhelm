import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { advanceTimersByTime, runOnlyPendingTimers } from '../test-utils/jest';
import { useDebouncedCallback } from './use-debounced-callback';

jest.useFakeTimers();
afterEach(() => {
  runOnlyPendingTimers();
});

const TestComponent: React.FC<{ callback: () => void }> = ({ callback }) => {
  const onClick = useDebouncedCallback(callback, 100);
  return <button onClick={onClick}>Click me</button>;
};

it('should debounce calls to the same function', () => {
  let callback = jest.fn();
  render(<TestComponent callback={callback} />);

  let btn = screen.getByRole('button');

  userEvent.click(btn);
  runOnlyPendingTimers();
  expect(callback).toHaveBeenCalledTimes(1);

  userEvent.click(btn);
  advanceTimersByTime(10);
  userEvent.click(btn);
  advanceTimersByTime(10);
  userEvent.click(btn);
  advanceTimersByTime(10);
  expect(callback).toHaveBeenCalledTimes(1);
});
