import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { useIsMounted } from './use-is-mounted';

const TestComponent: React.FC<{
  fn: () => void;
  delay: number;
}> = ({ fn, delay }) => {
  const isMounted = useIsMounted();

  useEffect(() => {
    /**
     * Note that the better way to solve this exact problem is to actually
     * cancel the timeout in the returning function provided to useEffect.
     */
    setTimeout(() => isMounted() && fn(), delay);
  }, [isMounted, delay, fn]);

  return <p />;
};

it('should return a boolean indicating if the component is still mounted', () => {
  jest.useFakeTimers();
  const mock = jest.fn();
  const delay = 1000;
  const { unmount } = render(<TestComponent fn={mock} delay={delay} />);

  unmount();

  jest.advanceTimersByTime(delay);
  expect(mock).not.toHaveBeenCalled();
});
