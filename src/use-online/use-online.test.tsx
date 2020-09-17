import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useOnline } from './';

const TestComponent = (): JSX.Element => {
  const isOnline = useOnline();
  return <p>{isOnline ? 'online' : 'offline'}</p>;
};

it('should determine if a client is online or not', () => {
  render(<TestComponent />);

  expect(screen.getByText('online')).toBeInTheDocument();

  const evt = new Event('offline', { bubbles: true });
  fireEvent(window, evt);

  expect(screen.getByText('offline')).toBeInTheDocument();
});
