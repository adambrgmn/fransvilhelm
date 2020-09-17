import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { useEventListener } from './';

afterEach(cleanup);

const KeysPressed = ({
  type = 'keypress',
}: {
  type?: 'keypress' | 'keydown';
}): JSX.Element => {
  const [keys, setKeys] = React.useState('');
  useEventListener(type, (ev) => {
    setKeys(`${keys}${ev.key}`);
  });

  return <output>{keys}</output>;
};

it('should handle events', () => {
  const { getByText } = render(<KeysPressed />);

  const ev = new KeyboardEvent('keypress', { key: 'a' });
  fireEvent(window, ev);
  expect(getByText(/a/)).toBeInTheDocument();
});

it('should handle simultaneous events', () => {
  const { getByText } = render(<KeysPressed />);

  ['a', 'b', 'c'].forEach((key) => {
    const ev = new KeyboardEvent('keypress', { key });
    fireEvent(window, ev);
  });
  expect(getByText(/abc/)).toBeInTheDocument();
});

it('should handle changing event types', () => {
  const { rerender, getByText } = render(<KeysPressed type="keypress" />);
  fireEvent(window, new KeyboardEvent('keypress', { key: 'a' }));

  rerender(<KeysPressed type="keydown" />);
  fireEvent(window, new KeyboardEvent('keydown', { key: 'b' }));

  expect(getByText(/ab/)).toBeInTheDocument();
});
