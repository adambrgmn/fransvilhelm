import { render, screen } from '@testing-library/react';
import { createRef, Fragment } from 'react';

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
    portalRef: React.Ref<HTMLLabelElement>;
  }> = ({ portalRef }) => {
    return (
      <Fragment>
        <Portal ref={portalRef} as="label" htmlFor="email-input">
          <span>E-mail</span>
        </Portal>
        <input id="email-input" type="email" />
      </Fragment>
    );
  };

  let ref = createRef<HTMLLabelElement>();
  render(<TestComponent portalRef={ref} />);

  expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});
