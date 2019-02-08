import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { useScrollPosition } from '../use-scroll-position';

afterEach(cleanup);

const TestComponent = ({ throttle }: { throttle?: any }): JSX.Element => {
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

  expect(getByText(/x: \d+/)).toHaveTextContent('x: 0');
  expect(getByText(/y: \d+/)).toHaveTextContent('y: 0');

  Object.defineProperty(window, 'pageXOffset', { value: 100 });
  Object.defineProperty(window, 'pageYOffset', { value: 100 });
  const scrollEv = new Event('scroll');
  fireEvent(window, scrollEv);

  expect(getByText(/x: \d+/)).toHaveTextContent('x: 100');
  expect(getByText(/y: \d+/)).toHaveTextContent('y: 100');
});

it('should accept an optional throttle wrapper', () => {
  jest.spyOn(window, 'requestAnimationFrame');
  const throttle = (fn: () => void) => () => window.requestAnimationFrame(fn); // eslint-disable-line

  render(<TestComponent throttle={throttle} />);

  const scrollEv = new Event('scroll');
  fireEvent(window, scrollEv);

  expect(window.requestAnimationFrame).toHaveBeenCalled();
});
