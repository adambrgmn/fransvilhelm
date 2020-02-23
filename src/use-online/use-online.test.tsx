import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { useOnline } from './';

afterEach(cleanup);

const TestComponent = (): JSX.Element => {
  const isOnline = useOnline();
  return <p>{isOnline ? 'online' : 'offline'}</p>;
};

it('should determine if a client is online or not', () => {
  const { getByText } = render(<TestComponent />);

  expect(getByText('online')).toBeInTheDocument();

  const evt = new Event('offline', { bubbles: true });
  fireEvent(window, evt);

  expect(getByText('offline')).toBeInTheDocument();
});
