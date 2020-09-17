import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { useDimensions } from './';

const TestComponent = (): JSX.Element => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const rect = useDimensions(ref);
  return <p ref={ref}>{rect && rect.width}</p>;
};

it('should make dom measurements', () => {
  render(<TestComponent />);
  expect(screen.getByText(/\d+/)).toBeInTheDocument();
});
