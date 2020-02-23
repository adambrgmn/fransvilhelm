import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { usePersistedState } from '.';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

afterEach(() => {
  cleanup();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.clear.mockClear();
});

it('should be a drop in replacement for the useState hook', () => {
  const Comp = (): JSX.Element => {
    const [count, setState] = usePersistedState(0);
    return <button onClick={() => setState(count + 1)}>{count}</button>;
  };

  const { getByText } = render(<Comp />);
  const btn = getByText(/\d+/);

  fireEvent.click(btn);

  expect(btn).toHaveTextContent('1');
  expect(localStorageMock.setItem).toHaveBeenCalledWith(
    'local-storage-hook',
    '1',
  );
});

it('should use persisted value as initial state (if set)', () => {
  localStorageMock.getItem.mockImplementationOnce(() => '100');
  const Comp = (): JSX.Element => {
    const [count, setCount] = usePersistedState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  };

  const { getByText } = render(<Comp />);
  const btn = getByText(/\d+/);

  expect(btn).toHaveTextContent('100');
});

it('should emit updates to other components using the same key', () => {
  const CountButton = ({ testId }: { testId: string }): JSX.Element => {
    const [count, setCount] = usePersistedState(0, 'counter');
    return (
      <button data-testid={testId} onClick={() => setCount(count + 1)}>
        {count}
      </button>
    );
  };

  const Comp = (): JSX.Element => {
    return (
      <div>
        <CountButton testId="btn-1" />
        <CountButton testId="btn-2" />
      </div>
    );
  };

  const { getByTestId } = render(<Comp />);

  const btn1 = getByTestId('btn-1');
  const btn2 = getByTestId('btn-2');

  fireEvent.click(btn1);
  expect(btn1).toHaveTextContent('1');
  expect(btn2).toHaveTextContent('1');
});

it('should update state in reaction to window storage event', () => {
  const Comp = (): JSX.Element => {
    const [count, setState] = usePersistedState(0, 'test-key');
    return <button onClick={() => setState(count + 1)}>{count}</button>;
  };

  const { getByText } = render(<Comp />);
  const btn = getByText(/\d+/);

  fireEvent(
    window,
    new StorageEvent('storage', {
      key: 'test-key',
      newValue: JSON.stringify(10),
    }),
  );

  expect(btn).toHaveTextContent('10');
});
