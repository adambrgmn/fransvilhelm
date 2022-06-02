import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useId } from './use-id';

const TestComponent: React.FC = () => {
  const result = useId();
  return <p />;
};

it('should ...', () => {
  render(<TestComponent />);
});
