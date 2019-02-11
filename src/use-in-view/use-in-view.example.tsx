import * as React from 'react';
import { useInView } from './';

const UseInViewExample = (): JSX.Element => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { rootMargin: '-10%' });
  return (
    <div>
      <p>
        The text below will change between visible and hidden when it passes the
        edges of the window (currently with a 10% margin inwards for
        deomnstration purposes).
      </p>
      <p>
        There's some extensive padding added to the bottom of this page to
        demonstrate what happens when the object gets close to the edge.
      </p>
      <p ref={ref}>
        Currently: <strong>{inView ? 'visible' : 'hidden'}</strong>
      </p>
    </div>
  );
};

export { UseInViewExample };
