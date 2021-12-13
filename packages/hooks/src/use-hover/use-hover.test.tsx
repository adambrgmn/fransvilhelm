import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useHover } from './use-hover';

const TestComponent: React.FC = () => {
  const [isHovering, props] = useHover();
  return <button {...props}>{isHovering ? 'inside' : 'outside'}</button>;
};

it('should react to hovers', () => {
  render(<TestComponent />);
  let btn = screen.getByRole('button');

  expect(btn).toHaveTextContent('outside');
  userEvent.hover(btn);
  expect(btn).toHaveTextContent('inside');
  userEvent.unhover(btn);
  expect(btn).toHaveTextContent('outside');
});

it('should react to focus events', () => {
  render(<TestComponent />);
  let btn = screen.getByRole('button');

  expect(btn).toHaveTextContent('outside');
  fireEvent.focus(btn);
  expect(btn).toHaveTextContent('inside');
  fireEvent.blur(btn);
  expect(btn).toHaveTextContent('outside');
});
