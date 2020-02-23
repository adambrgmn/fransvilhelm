import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useDimensions } from './';

afterEach(cleanup);

const TestComponent = (): JSX.Element => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const rect = useDimensions(ref);
  return <p ref={ref}>{rect && rect.width}</p>;
};

it('should make dom measurements', () => {
  const { getByText } = render(<TestComponent />);
  expect(getByText(/\d+/)).toBeInTheDocument();
});
