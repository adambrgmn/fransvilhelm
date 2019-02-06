import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { usePromise, AsyncState } from '../use-promise';

afterEach(cleanup);

function TestComponent<T>({
  fn,
  deps = [],
}: {
  fn: () => Promise<T>;
  deps?: ReadonlyArray<any>;
}): JSX.Element {
  const [state, result, error] = usePromise(fn, deps);

  return (
    <div>
      <p>State: {state}</p>
      {state === AsyncState.rejected && <p>Error: {error.message}</p>}
      {state === AsyncState.fullfilled && <p>Result: {result}</p>}
    </div>
  );
}

it('should handle a promise using a hook', async () => {
  const fn = jest.fn(() => Promise.resolve('success'));
  const { getByText } = render(<TestComponent fn={fn} />);

  await waitForElement(() => getByText(/success/));
  expect(getByText(/State/)).toHaveTextContent(AsyncState.fullfilled);
});

it('should handle rejected promises', async () => {
  const fn = jest.fn(() => Promise.reject(new Error('error')));
  const { getByText } = render(<TestComponent fn={fn} />);

  await waitForElement(() => getByText(/error/));
  expect(getByText(/State/)).toHaveTextContent(AsyncState.rejected);
  expect(fn).toHaveBeenCalledTimes(1);
});

it('should handle multiple promises ignoring the previous ones', async () => {
  const mock = jest.fn();

  const Component = ({ value }: { value: string }): JSX.Element => {
    const fn = React.useCallback(async () => {
      const val = await Promise.resolve(value);
      mock(val);
      return val;
    }, [value]);

    return <TestComponent fn={fn} deps={[value]} />;
  };

  const { getByText, container } = render(<Component value="one" />);
  render(<Component value="two" />, { container });

  await waitForElement(() => getByText(`State: ${AsyncState.fullfilled}`));
  expect(getByText(/Result/)).toHaveTextContent(/two/);
  expect(mock).toHaveBeenCalledWith('one');
  expect(mock).toHaveBeenCalledWith('two');
});

it('should handle multiple rejected promises', async () => {
  const mock = jest.fn();

  const Component = ({ value }: { value: string }): JSX.Element => {
    const fn = React.useCallback(async (): Promise<void> => {
      const val = await Promise.resolve(value);
      mock(val);
      throw new Error(val);
    }, [value]);

    return <TestComponent fn={fn} deps={[value]} />;
  };

  const { getByText, container } = render(<Component value="one" />);
  render(<Component value="two" />, { container });

  await waitForElement(() => getByText(`State: ${AsyncState.rejected}`));
  expect(getByText(/Error/)).toHaveTextContent(/two/);
  expect(mock).toHaveBeenCalledWith('one');
  expect(mock).toHaveBeenCalledWith('two');
});
