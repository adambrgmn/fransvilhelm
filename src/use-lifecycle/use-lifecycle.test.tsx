import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useMount, useUnmount, useUpdate } from './';

const TestComponent: React.FC<{
  onMount: (x: number) => void;
  onUnmount: (x: number) => void;
  onUpdate: (x: number) => void;
}> = ({ onMount, onUpdate, onUnmount }) => {
  const [state, setState] = React.useState(0);

  useMount(() => onMount(state));
  useUpdate(() => onUpdate(state));
  useUnmount(() => onUnmount(state));

  return <button onClick={() => setState(state + 1)}>+</button>;
};

it('should ...', () => {
  const onMount = jest.fn();
  const onUpdate = jest.fn();
  const onUnmount = jest.fn();

  const { unmount } = render(
    <TestComponent {...{ onMount, onUpdate, onUnmount }} />,
  );

  const btn = screen.getByText('+');

  // Mount
  expect(onMount).toHaveBeenCalledTimes(1);
  expect(onMount).toHaveBeenCalledWith(0);

  expect(onUpdate).not.toHaveBeenCalled();
  expect(onUnmount).not.toHaveBeenCalled();

  // Update
  userEvent.click(btn);
  userEvent.click(btn);

  expect(onUpdate).toHaveBeenCalledTimes(2);
  expect(onUpdate).toHaveBeenNthCalledWith(1, 1);
  expect(onUpdate).toHaveBeenNthCalledWith(2, 2);

  expect(onMount).toHaveBeenCalledTimes(1);
  expect(onUnmount).toHaveBeenCalledTimes(0);

  // Unmount
  unmount();

  expect(onUnmount).toHaveBeenCalledTimes(1);
  expect(onUnmount).toHaveBeenCalledWith(2);

  expect(onMount).toHaveBeenCalledTimes(1);
  expect(onUpdate).toHaveBeenCalledTimes(2);
});
