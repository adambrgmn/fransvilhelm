import { render, fireEvent, screen } from '@testing-library/react';

import { useOnline } from './use-online';

const TestComponent: React.FC = () => {
  const isOnline = useOnline();
  return <p>{isOnline ? 'online' : 'offline'}</p>;
};

it('should determine if a client is online or not', () => {
  render(<TestComponent />);

  expect(screen.getByText('online')).toBeInTheDocument();

  fireEvent(window, new Event('offline', { bubbles: true }));
  expect(screen.getByText('offline')).toBeInTheDocument();

  fireEvent(window, new Event('online', { bubbles: true }));
  expect(screen.getByText('online')).toBeInTheDocument();
});
