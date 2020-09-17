import * as React from 'react';
import { render, act, screen } from '@testing-library/react';

import { useInView } from './';

const TestComponent = (): JSX.Element => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref);
  return (
    <p data-testid="text-node" ref={ref}>
      {inView ? 'visible' : 'hidden'}
    </p>
  );
};

it('should trigger an event when in view', () => {
  render(<TestComponent />);
  const textNode = screen.getByTestId('text-node');

  expect(textNode).toHaveTextContent('hidden');

  act(() => {
    // @ts-ignore: This is a mocked method used to fake emitting an Intersection
    // event. Source can be found in src/setup-tests.js.
    window.IntersectionObserver.emit({
      isIntersecting: true,
    });
  });

  expect(textNode).toHaveTextContent('visible');
});
