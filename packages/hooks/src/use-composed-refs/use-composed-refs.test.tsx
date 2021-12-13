import { render } from '@testing-library/react';
import { createRef, useRef } from 'react';

import { useComposedRefs } from './use-composed-refs';

const TestComponent: React.FC<{ externalRefs: React.Ref<unknown>[] }> = ({
  externalRefs,
}) => {
  let internalRef = useRef();
  const ref = useComposedRefs(internalRef, ...externalRefs);
  return <p ref={ref} />;
};

it('should compose a set of refs into one', () => {
  let ref1 = createRef();
  let setMe: unknown = undefined;
  let ref2 = (value: unknown) => (setMe = value);
  render(<TestComponent externalRefs={[ref1, ref2]} />);

  expect(ref1.current).toBeInstanceOf(HTMLParagraphElement);
  expect(setMe).toBeInstanceOf(HTMLParagraphElement);
});
