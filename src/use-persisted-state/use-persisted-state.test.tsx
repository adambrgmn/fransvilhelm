import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { usePersistedState } from './use-persisted-state';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

afterEach(() => {
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.clear.mockClear();
});

it('should be a drop in replacement for the useState hook', () => {
  const Comp: React.FC = () => {
    const [count, setState] = usePersistedState(0);
    return <button onClick={() => setState(count + 1)}>{count}</button>;
  };

  render(<Comp />);
  const btn = screen.getByText(/\d+/);

  userEvent.click(btn);

  expect(btn).toHaveTextContent('1');
  expect(localStorageMock.setItem).toHaveBeenCalledWith(
    'local-storage-hook',
    '1',
  );
});

it('should use persisted value as initial state (if set)', () => {
  localStorageMock.getItem.mockImplementationOnce(() => '100');
  const Comp: React.FC = () => {
    const [count, setCount] = usePersistedState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  };

  render(<Comp />);
  const btn = screen.getByText(/\d+/);

  expect(btn).toHaveTextContent('100');
});

it('should emit updates to other components using the same key', () => {
  const CountButton: React.FC<{ testId: string }> = ({ testId }) => {
    const [count, setCount] = usePersistedState(0, 'counter');
    return (
      <button data-testid={testId} onClick={() => setCount(count + 1)}>
        {count}
      </button>
    );
  };

  const Comp: React.FC = () => {
    return (
      <div>
        <CountButton testId="btn-1" />
        <CountButton testId="btn-2" />
      </div>
    );
  };

  render(<Comp />);

  const btn1 = screen.getByTestId('btn-1');
  const btn2 = screen.getByTestId('btn-2');

  userEvent.click(btn1);
  expect(btn1).toHaveTextContent('1');
  expect(btn2).toHaveTextContent('1');
});

it('should update state in reaction to window storage event', () => {
  const Comp: React.FC = () => {
    const [count, setState] = usePersistedState(0, 'test-key');
    return <button onClick={() => setState(count + 1)}>{count}</button>;
  };

  render(<Comp />);
  const btn = screen.getByText(/\d+/);

  fireEvent(
    window,
    new StorageEvent('storage', {
      key: 'test-key',
      newValue: JSON.stringify(10),
    }),
  );

  expect(btn).toHaveTextContent('10');
});
