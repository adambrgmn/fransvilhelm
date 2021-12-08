import { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useEventListener } from './use-event-listener';

const KeysPressed: React.FC<{ type?: 'keypress' | 'keydown' }> = ({
  type = 'keypress',
}) => {
  const [keys, setKeys] = useState('');
  useEventListener(type, (ev) => {
    setKeys(`${keys}${ev.key}`);
  });

  return <output>{keys}</output>;
};

it('should handle events', () => {
  render(<KeysPressed />);

  const ev = new KeyboardEvent('keypress', { key: 'a' });
  fireEvent(window, ev);
  expect(screen.getByText(/a/)).toBeInTheDocument();
});

it('should handle simultaneous events', () => {
  render(<KeysPressed />);

  ['a', 'b', 'c'].forEach((key) => {
    const ev = new KeyboardEvent('keypress', { key });
    fireEvent(window, ev);
  });
  expect(screen.getByText(/abc/)).toBeInTheDocument();
});

it('should handle changing event types', () => {
  const { rerender } = render(<KeysPressed type="keypress" />);
  fireEvent(window, new KeyboardEvent('keypress', { key: 'a' }));

  rerender(<KeysPressed type="keydown" />);
  fireEvent(window, new KeyboardEvent('keydown', { key: 'b' }));

  expect(screen.getByText(/ab/)).toBeInTheDocument();
});
