import { render, screen } from '@testing-library/react';
import { useRef } from 'react';

import { useLockBodyScroll } from './';

const TestComponent: React.FC<{ lock: boolean }> = ({ lock }) => {
  useLockBodyScroll(lock);
  return <p />;
};

it('should lock scrolling of body when enabled', () => {
  const { rerender } = render(<TestComponent lock={true} />);
  expect(document.body.style.overflow).toEqual('hidden');

  rerender(<TestComponent lock={false} />);
  expect(document.body.style.overflow).toEqual('visible');
});

it('should accept a second argument to pick a target a specific element', () => {
  const Comp: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
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
