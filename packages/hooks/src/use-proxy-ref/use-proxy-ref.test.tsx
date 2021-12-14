import { render } from '@testing-library/react';
import { createRef } from 'react';

import { useProxyRef } from './use-proxy-ref';

const TestComponent: React.FC<{
  externalRefs: React.Ref<HTMLParagraphElement>[];
}> = ({ externalRefs }) => {
  const ref = useProxyRef<HTMLParagraphElement>(null, ...externalRefs);
  return <p ref={ref} />;
};

it('should proxy a ref object and propagate and attempt to set a property on it to the provided external refs', () => {
  let ref1 = createRef<HTMLParagraphElement>();
  let setMe: unknown = undefined;
  let ref2 = (value: unknown) => (setMe = value);
  render(<TestComponent externalRefs={[ref1, ref2]} />);

  expect(ref1.current).toBeInstanceOf(HTMLParagraphElement);
  expect(setMe).toBeInstanceOf(HTMLParagraphElement);
});
