import { render, screen, act } from '@testing-library/react';

import { useKeypress } from './use-keypress';

let TestComponent: React.FC<{ char: string }> = ({ char }) => {
  let pressing = useKeypress(char);
  return <p>Pressing: {pressing ? 'true' : 'false'}</p>;
};

let dispatchKeyboardEvent = (type: string, key: string): void => {
  act(() => {
    window.dispatchEvent(new KeyboardEvent(type, { key }));
  });
};

it('should react to keypresses', () => {
  render(<TestComponent char="a" />);

  let result = screen.getByText(/Pressing:/);
  expect(result).toHaveTextContent('false');

  dispatchKeyboardEvent('keydown', 'a');
  expect(result).toHaveTextContent('true');

  dispatchKeyboardEvent('keyup', 'a');
  expect(result).toHaveTextContent('false');
});

it("does not react when pressing chars that it doesn't care about", () => {
  render(<TestComponent char="a" />);

  let result = screen.getByText(/Pressing:/);
  expect(result).toHaveTextContent('false');

  dispatchKeyboardEvent('keydown', 'b');
  expect(result).toHaveTextContent('false');
});
