import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { useInterval } from '../use-interval';

afterEach(cleanup);

interface Props {
  initialCount?: number;
  initialRunning?: boolean;
  initialDelay?: number;
}

const MockComponent = ({
  initialCount = 1,
  initialRunning = true,
  initialDelay = 1000,
}: Props) => {
  const [count, setCount] = React.useState(initialCount);
  const [running, setRunning] = React.useState(initialRunning);
  const [delay, setDelay] = React.useState(initialDelay);

  useInterval(() => setCount(count + 1), running ? delay : null);

  return (
    <div>
      <p data-testid="count">{count}</p>
      <input
        type="number"
        data-testid="delay"
        value={delay}
        onChange={e => {
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
  const { getByTestId } = render(<MockComponent />);

  const count = getByTestId('count');
  const delay = getByTestId('delay');
  const pause = getByTestId('pause');

  return { count, delay, pause };
};

it('should run an interval', () => {
  jest.useFakeTimers();
  const { count } = renderComp();

  expect(count).toHaveTextContent('1');

  jest.advanceTimersByTime(1000);
  expect(count).toHaveTextContent('2');

  jest.advanceTimersByTime(1000);
  expect(count).toHaveTextContent('3');
});

it('should be pausable', () => {
  jest.useFakeTimers();
  const { count, pause } = renderComp();

  expect(count).toHaveTextContent('1');
  fireEvent.click(pause);
  jest.advanceTimersByTime(2000);
  expect(count).toHaveTextContent('1');
});

it('should be possible to adjust interval speed', () => {
  jest.useFakeTimers();
  const { count, delay } = renderComp();

  expect(count).toHaveTextContent('1');

  fireEvent.change(delay, { target: { value: '500' } });
  jest.advanceTimersByTime(500);
  expect(count).toHaveTextContent('2');

  fireEvent.change(delay, { target: { value: '5000' } });
  jest.advanceTimersByTime(10000);
  expect(count).toHaveTextContent('4');
});
