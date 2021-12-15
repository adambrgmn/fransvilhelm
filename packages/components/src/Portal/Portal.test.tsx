import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { Portal } from './Portal';

it('renders a portal', () => {
  const TestComponent: React.FC = () => {
    return (
      <div data-testid="parent">
        <Portal>
          <h1>Heading</h1>
        </Portal>
      </div>
    );
  };
  render(<TestComponent />);

  let parent = screen.getByTestId('parent');
  let heading = screen.getByRole('heading');

  expect(parent.contains(heading)).toBeFalsy();
});

it('can render as any given element', () => {
  const TestComponent: React.FC<{
    portalRef: React.RefObject<HTMLHeadingElement>;
  }> = ({ portalRef }) => {
    return (
      <Portal ref={portalRef} as="h1">
        <span>Heading</span>
      </Portal>
    );
  };

  let ref = createRef<HTMLHeadingElement>();
  render(<TestComponent portalRef={ref} />);

  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
});
