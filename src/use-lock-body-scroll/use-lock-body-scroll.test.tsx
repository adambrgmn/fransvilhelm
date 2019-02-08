import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import { useLockBodyScroll } from '../use-lock-body-scroll';

afterEach(cleanup);

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
