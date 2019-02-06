import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup, flushEffects } from 'react-testing-library';
import { useScrollPosition, ThrottleWrapper } from '../use-scroll-position';

afterEach(cleanup);

const TestComponent = ({ throttle }: { throttle?: ThrottleWrapper }) => {
  const position = useScrollPosition(throttle);
  return (
    <div style={{ height: '200vh' }}>
      <p>x: {position.x}</p>
      <p>y: {position.y}</p>
    </div>
  );
};

it('should track scroll position', () => {
  const { getByText } = render(<TestComponent />);
  flushEffects();

  expect(getByText(/x\: \d+/)).toHaveTextContent('x: 0');
  expect(getByText(/y\: \d+/)).toHaveTextContent('y: 0');

  Object.defineProperty(window, 'pageXOffset', { value: 100 });
  Object.defineProperty(window, 'pageYOffset', { value: 100 });
  const scrollEv = new Event('scroll');
  window.dispatchEvent(scrollEv);

  expect(getByText(/x\: \d+/)).toHaveTextContent('x: 100');
  expect(getByText(/y\: \d+/)).toHaveTextContent('y: 100');
});

it('should accept an optional throttle wrapper', () => {
  jest.spyOn(window, 'requestAnimationFrame');
  const throttle = (fn: () => void) => () => window.requestAnimationFrame(fn);

  render(<TestComponent throttle={throttle} />);
  flushEffects();

  const scrollEv = new Event('scroll');
  window.dispatchEvent(scrollEv);

  expect(window.requestAnimationFrame).toHaveBeenCalled();
});
