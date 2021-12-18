import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useForceUpdate } from './use-force-update';

const TestComponent: React.FC<{ onRender: () => any }> = ({ onRender }) => {
  const rerender = useForceUpdate();
  onRender();
  return <button onClick={rerender}>Click me</button>;
};

it('should force a rerender when callback is called', () => {
  let onRender = jest.fn();
  render(<TestComponent onRender={onRender} />);

  expect(onRender).toHaveBeenCalledTimes(1);

  let btn = screen.getByRole('button');
  userEvent.click(btn);
  userEvent.click(btn);
  expect(onRender).toHaveBeenCalledTimes(3);
});
