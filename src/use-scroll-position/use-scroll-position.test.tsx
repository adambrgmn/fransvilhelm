import { render, fireEvent, screen } from '@testing-library/react';

import { useScrollPosition } from './use-scroll-position';

const TestComponent: React.FC = () => {
  const position = useScrollPosition();
  return (
    <div style={{ height: '200vh' }}>
      <p>x: {position.x}</p>
      <p>y: {position.y}</p>
    </div>
  );
};

it('should track scroll position', () => {
  render(<TestComponent />);

  expect(screen.getByText(/x: \d+/)).toHaveTextContent('x: 0');
  expect(screen.getByText(/y: \d+/)).toHaveTextContent('y: 0');

  Object.defineProperty(window, 'pageXOffset', { value: 100 });
  Object.defineProperty(window, 'pageYOffset', { value: 100 });
  const scrollEv = new Event('scroll');
  fireEvent(window, scrollEv);

  expect(screen.getByText(/x: \d+/)).toHaveTextContent('x: 100');
  expect(screen.getByText(/y: \d+/)).toHaveTextContent('y: 100');
});
