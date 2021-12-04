import React, { useState } from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useInterval } from './';

const advanceByTime = (time: number): void => {
  act(() => {
    jest.advanceTimersByTime(time);
  });
};

interface Props {
  initialCount?: number;
  initialRunning?: boolean;
  initialDelay?: number;
}

const MockComponent: React.FC<Props> = ({
  initialCount = 1,
  initialRunning = true,
  initialDelay = 1000,
}) => {
  const [count, setCount] = useState(initialCount);
  const [running, setRunning] = useState(initialRunning);
  const [delay, setDelay] = useState(initialDelay);

  useInterval(() => setCount(count + 1), running ? delay : null);

  return (
    <div>
      <p data-testid="count">{count}</p>
      <input
        type="number"
        data-testid="delay"
        value={delay}
        onChange={(e) => {
          setDelay(Number.parseInt(e.target.value, 10));
        }}
      />
      <button data-testid="pause" onClick={() => setRunning(!running)}>
        Pause
      </button>
    </div>
  );
};

const renderComp = () => {
  render(<MockComponent />);

  const count = screen.getByTestId('count');
  const delay = screen.getByTestId('delay');
  const pause = screen.getByTestId('pause');

  return { count, delay, pause };
};

it('should run an interval', () => {
  jest.useFakeTimers();
  const { count } = renderComp();

  expect(count).toHaveTextContent('1');

  advanceByTime(1000);
  expect(count).toHaveTextContent('2');

  advanceByTime(1000);
  expect(count).toHaveTextContent('3');
});

it('should be pausable', () => {
  jest.useFakeTimers();
  const { count, pause } = renderComp();

  expect(count).toHaveTextContent('1');
  userEvent.click(pause);
  advanceByTime(2000);
  expect(count).toHaveTextContent('1');
});

it('should be possible to adjust interval speed', () => {
  jest.useFakeTimers();
  const { count, delay } = renderComp();

  expect(count).toHaveTextContent('1');

  fireEvent.change(delay, { target: { value: '500' } });
  advanceByTime(500);
  expect(count).toHaveTextContent('2');

  fireEvent.change(delay, { target: { value: '5000' } });
  advanceByTime(5000);
  advanceByTime(5000);
  expect(count).toHaveTextContent('4');
});
