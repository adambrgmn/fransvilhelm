import * as React from 'react';
import { render, act, screen } from '@testing-library/react';

import { setupIntersectionObserverMock } from '../test-utils/setup-intersection-observer';
import { useInView } from './';

const TestComponent: React.FC = () => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref);
  return (
    <p data-testid="text-node" ref={ref}>
      {inView ? 'visible' : 'hidden'}
    </p>
  );
};

let { emit, prepare, teardown } = setupIntersectionObserverMock();

beforeEach(prepare);
afterEach(teardown);

it('should trigger an event when in view', () => {
  render(<TestComponent />);
  const textNode = screen.getByTestId('text-node');

  expect(textNode).toHaveTextContent('hidden');

  act(() => emit({ isIntersecting: true }));

  expect(textNode).toHaveTextContent('visible');

  act(() => emit({ isIntersecting: false }));
  expect(textNode).toHaveTextContent('hidden');
});
