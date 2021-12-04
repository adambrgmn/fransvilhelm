import { useRef } from 'react';
import { render, screen } from '@testing-library/react';

import { useDimensions } from './use-dimensions';

let getBoundingClientRect = jest
  .fn<Partial<DOMRect>, void[]>()
  .mockImplementation(() => ({
    width: 0,
    height: 0,
  }));

beforeEach(() => {
  getBoundingClientRect.mockClear();
  Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
    value: getBoundingClientRect,
  });
});

it('should make dom measurements and subscribe to changes', async () => {
  let callback = jest.fn();
  const TestComponent = () => {
    const ref = useRef<HTMLParagraphElement>(null);
    const rect = useDimensions(ref, true, callback);

    return <p ref={ref}>Width: {rect?.width ?? '-'}</p>;
  };

  getBoundingClientRect.mockReturnValue({ width: 100 });

  render(<TestComponent />);
  expect(screen.getByText('Width: 100')).toBeInTheDocument();

  getBoundingClientRect.mockReturnValue({ width: 200 });
  expect(await screen.findByText('Width: 200')).toBeInTheDocument();

  expect(callback).toHaveBeenCalled();
});

it('should not listen for changes if observe is false/undefined', async () => {
  const TestComponent = () => {
    const ref = useRef<HTMLParagraphElement>(null);
    const rect = useDimensions(ref);

    return <p ref={ref}>Width: {rect?.width ?? '-'}</p>;
  };

  getBoundingClientRect.mockReturnValue({ width: 100 });
  render(<TestComponent />);
  expect(screen.getByText('Width: 100')).toBeInTheDocument();

  getBoundingClientRect.mockReturnValue({ width: 200 });
  await delay(100);
  expect(screen.getByText('Width: 100')).toBeInTheDocument();
});

it('will not fail when element is never referenced', async () => {
  const TestComponent = () => {
    const ref = useRef<HTMLElement>(null);
    const rect = useDimensions(ref);

    return <p>{rect ? rect.width : 'No rect'}</p>;
  };

  render(<TestComponent />);

  await delay(100);
  expect(screen.getByText('No rect')).toBeInTheDocument();
});

let delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
