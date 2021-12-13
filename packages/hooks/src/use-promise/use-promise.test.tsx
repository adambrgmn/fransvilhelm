import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { usePromise } from './use-promise';

const TestComponent: React.FC<{
  callback: () => Promise<string>;
  immediate?: boolean;
  onSuccess?: (result: string) => void;
  onError?: (error: unknown) => void;
}> = ({ callback, immediate, onSuccess, onError }) => {
  const { state, result, error, execute } = usePromise(callback, immediate, {
    onSuccess,
    onError,
  });

  return (
    <div>
      <button type="button" onClick={execute}>
        execute
      </button>
      {state === 'idle' && <p>idle</p>}
      {state === 'pending' && <p>pending</p>}
      {state === 'resolved' && <p>resolved: {result}</p>}
      {state === 'rejected' && <p>rejected: {(error as Error).message}</p>}
    </div>
  );
};

it('should fire and resolve promise when running execute', async () => {
  let callback = jest.fn(() => Promise.resolve('foo'));
  render(<TestComponent callback={callback} />);

  let btn = screen.getByRole('button');

  expect(screen.getByText('idle')).toBeInTheDocument();

  userEvent.click(btn);
  expect(screen.getByText('pending')).toBeInTheDocument();

  expect(await screen.findByText('resolved: foo')).toBeInTheDocument();
});

it('should fire promise immediatedly if immediate is true', async () => {
  let callback = jest.fn(() => Promise.resolve('foo'));
  render(<TestComponent callback={callback} immediate />);

  expect(screen.getByText('pending')).toBeInTheDocument();
  expect(await screen.findByText('resolved: foo')).toBeInTheDocument();
});

it('should resolve correct value in the end', async () => {
  let onSuccess = jest.fn();
  let callback = jest
    .fn<Promise<string>, []>()
    .mockResolvedValueOnce('1')
    .mockResolvedValueOnce('2')
    .mockResolvedValueOnce('3');

  render(<TestComponent callback={callback} onSuccess={onSuccess} />);

  let btn = screen.getByRole('button');

  expect(screen.getByText('idle')).toBeInTheDocument();

  userEvent.click(btn);
  userEvent.click(btn);
  userEvent.click(btn);
  expect(screen.getByText('pending')).toBeInTheDocument();

  expect(await screen.findByText('resolved: 3')).toBeInTheDocument();
  expect(onSuccess).toHaveBeenCalledWith('3');
  expect(onSuccess).toHaveBeenCalledTimes(1);
});

it('handles errors', async () => {
  let onError = jest.fn();
  let callback = jest
    .fn<Promise<string>, []>()
    .mockRejectedValue(new Error('alert!'));

  render(<TestComponent callback={callback} immediate onError={onError} />);

  expect(screen.getByText('pending')).toBeInTheDocument();
  expect(await screen.findByText('rejected: alert!')).toBeInTheDocument();
  expect(onError).toHaveBeenCalledTimes(1);
});
