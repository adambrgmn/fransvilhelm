import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { useLockBodyScroll } from './';

const TestComponent = ({ lock }: { lock: boolean }): JSX.Element => {
  useLockBodyScroll(lock);
  return <p />;
};

it('should lock scrolling of body when enabled', () => {
  const { container } = render(<TestComponent lock={true} />);
  expect(document.body.style.overflow).toEqual('hidden');

  render(<TestComponent lock={false} />, { container });
  expect(document.body.style.overflow).toEqual('visible');
});

it('should accept a second argument to pick a target a specific element', () => {
  const Comp = (): JSX.Element => {
    const ref = React.useRef<HTMLDivElement>(null);
    useLockBodyScroll(true, ref);

    return (
      <div data-testid="container" ref={ref}>
        <p>Hello world</p>
      </div>
    );
  };

  render(<Comp />);
  const container = screen.getByTestId('container');

  expect(container.style.overflow).toEqual('hidden');
});
