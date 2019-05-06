import * as React from 'react';
import { useInView } from './';

const UseInViewExample = (): JSX.Element => {
  const paragraphRef = React.useRef<HTMLParagraphElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const opts = React.useMemo(
    () => ({ rootMargin: '-15%', root: containerRef.current }),
    [containerRef],
  );

  const inView = useInView(paragraphRef, opts);

  return (
    <div ref={containerRef} style={{ height: 200, overflow: 'scroll' }}>
      <div style={{ height: '100vh' }}>
        <p>
          The text below will change between visible and hidden when it passes
          the edges of the window (currently with a 15% margin inwards for
          demonstration purposes).
        </p>
        <p>
          There's some extensive padding added to the bottom of this page to
          demonstrate what happens when the object gets close to the edge.
        </p>
        <p ref={paragraphRef}>
          Currently: <strong>{inView ? 'visible' : 'hidden'}</strong>
        </p>
      </div>
    </div>
  );
};

export { UseInViewExample };
