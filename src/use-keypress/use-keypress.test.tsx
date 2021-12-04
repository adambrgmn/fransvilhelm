import { render, screen, act } from '@testing-library/react';

import { useKeypress } from './';

const TestComponent: React.FC<{ char: string }> = ({ char }) => {
  const pressing = useKeypress(char);
  return <p>Pressing: {pressing ? 'true' : 'false'}</p>;
};

const dispatchKeyboardEvent = (type: string, key: string): void => {
  act(() => {
    window.dispatchEvent(new KeyboardEvent(type, { key }));
  });
};

it('should react to keypresses', () => {
  render(<TestComponent char="a" />);

  const result = screen.getByText(/Pressing:/);
  expect(result).toHaveTextContent('false');

  dispatchKeyboardEvent('keydown', 'a');
  expect(result).toHaveTextContent('true');

  dispatchKeyboardEvent('keyup', 'a');
  expect(result).toHaveTextContent('false');
});
