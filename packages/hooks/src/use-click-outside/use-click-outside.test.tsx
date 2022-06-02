import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';

import { useClickOutside } from './use-click-outside';

const TestComponent: React.FC<{ onClickOutside?: () => void }> = ({ onClickOutside }) => {
  const elRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);

  useClickOutside(elRef, () => {
    if (onClickOutside) onClickOutside();
    setCount(count + 1);
  });

  return (
    <div>
      <span>Count: {count}</span>
      <button ref={elRef}>No action</button>
      <button>Increase</button>
    </div>
  );
};

it('should trigger handler on clicks outside of given ref', () => {
  let callback = jest.fn();
  render(<TestComponent onClickOutside={callback} />);

  let noAction = screen.getByRole('button', { name: 'No action' });
  let action = screen.getByRole('button', { name: 'Increase' });

  userEvent.click(noAction);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  userEvent.click(action);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();

  expect(callback).toHaveBeenCalledTimes(1);
});

it('listens for touch events', () => {
  let callback = jest.fn();
  render(<TestComponent onClickOutside={callback} />);

  let noAction = screen.getByRole('button', { name: 'No action' });
  let action = screen.getByRole('button', { name: 'Increase' });

  fireEvent.touchStart(noAction);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  fireEvent.touchStart(action);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();

  expect(callback).toHaveBeenCalledTimes(1);
});
