import 'jest-dom/extend-expect';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from 'react-testing-library';
import { useKeypress } from './';

afterEach(cleanup);

const TestComponent = ({ char }: { char: string }): JSX.Element => {
  const pressing = useKeypress(char);
  return <p>Pressing: {pressing ? 'true' : 'false'}</p>;
};

const dispatchKeyboardEvent = (type: string, key: string): void => {
  act(() => {
    window.dispatchEvent(new KeyboardEvent(type, { key }));
  });
};

it('should react to keypresses', () => {
  const { getByText } = render(<TestComponent char="a" />);

  const result = getByText(/Pressing:/);
  expect(result).toHaveTextContent('false');

  dispatchKeyboardEvent('keydown', 'a');
  expect(result).toHaveTextContent('true');

  dispatchKeyboardEvent('keyup', 'a');
  expect(result).toHaveTextContent('false');
});
