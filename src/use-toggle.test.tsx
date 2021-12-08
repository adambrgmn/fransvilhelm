import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useToggle } from './use-toggle';

const TestComponent: React.FC = () => {
  const [value, toggle] = useToggle();
  return <button onClick={toggle}>{value ? 'true' : 'false'}</button>;
};

it('should toggle values', () => {
  render(<TestComponent />);
  let btn = screen.getByRole('button');

  expect(btn).toHaveTextContent('false');
  userEvent.click(btn);
  expect(btn).toHaveTextContent('true');
  userEvent.click(btn);
  expect(btn).toHaveTextContent('false');
});
