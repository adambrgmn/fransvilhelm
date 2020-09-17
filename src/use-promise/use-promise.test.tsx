import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { usePromise } from '../use-promise';
import { AsyncState } from '../shared';

/**
 *
 * React still outputs a disturbing warning about state updates not being
 * wrapped in `act` when using async actions. Therefor we will mute
 * `console.error` for now until it's resolve (follow:
 * https://github.com/facebook/react/issues/14775 for info)
 *
 * TODO: Reenable `console.error`
 */
let originalConsoleError = console.error;
beforeAll(() => {
  console.error = () => {};
});

afterAll(() => {
  console.error = originalConsoleError;
});

const fetchUsername = jest.fn((username: string) => {
  if (['reject', 'rejected', 'unfullfilled'].includes(username)) {
    return Promise.reject(new Error(`${username} is not a username`));
  }
  return Promise.resolve(username);
});

afterEach(() => {
  fetchUsername.mockClear();
});

const FetchUsername = ({ username }: { username: string }): JSX.Element => {
  const [state, name, error] = usePromise(() => fetchUsername(username), [
    username,
  ]);

  let child = 'loading...';
  if (state === AsyncState.fullfilled) child = name as string;
  if (state === AsyncState.rejected) child = error.message;

  return <p>{child}</p>;
};

it('should handle a promise using a hook', async () => {
  render(<FetchUsername username="ab" />);

  await screen.findByText(/ab/i);
  expect(fetchUsername).toHaveBeenCalledTimes(1);
});

it('should handle rejected promises', async () => {
  render(<FetchUsername username="reject" />);
  await screen.findByText(/is not a username/i);
});

it('should handle multiple promises ignoring the previous ones', async () => {
  const { rerender } = render(<FetchUsername username="one" />);
  rerender(<FetchUsername username="two" />);

  await screen.findByText(/two/i);
  expect(fetchUsername).toHaveBeenCalledWith('one');
  expect(fetchUsername).toHaveBeenCalledWith('two');
});

it('should handle multiple rejected promises', async () => {
  const { rerender } = render(<FetchUsername username="reject" />);
  rerender(<FetchUsername username="rejected" />);
  rerender(<FetchUsername username="unfullfilled" />);

  await screen.findByText(/is not a username/i);
});
