import { render } from '@testing-library/react';

import { useLazyInit } from './use-lazy-init';

const TestComponent: React.FC<{ init: () => boolean }> = ({ init }) => {
  useLazyInit(init);
  return <p />;
};

it('should call init function only once', () => {
  let init = jest.fn();
  let { rerender } = render(<TestComponent init={init} />);

  rerender(<TestComponent init={init} />);
  rerender(<TestComponent init={init} />);

  expect(init).toHaveBeenCalledTimes(1);
});
