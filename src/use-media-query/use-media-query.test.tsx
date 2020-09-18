import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { useMediaQuery } from './';

const addEventListener = jest.fn();
const removeEventListener = jest.fn();
const matchMedia = jest.fn(() => ({
  matches: true,
  addEventListener,
  removeEventListener,
}));

beforeEach(() => {
  addEventListener.mockClear();
  removeEventListener.mockClear();
  Object.defineProperty(window, 'matchMedia', { value: matchMedia });
});

const TestComponent = ({ query }: { query: string }): JSX.Element => {
  const matches = useMediaQuery(query);
  return <p>{matches ? 'true' : 'false'}</p>;
};

it('should test if a media query is satisfied', () => {
  render(<TestComponent query="(max-width: 400px)" />);
  expect(screen.getByText(/true/)).toBeInTheDocument();
});
