import { useIsomorphicLayoutEffect, useForceUpdate } from '@fransvilhelm/hooks';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { forwardRefWithAs } from '../utils/forward-ref';

interface PortalProps {}

export const Portal = forwardRefWithAs<PortalProps, 'div'>(
  ({ as: Component = 'div', children, ...props }, ref) => {
    let tempRef = useRef<HTMLSpanElement>(null);
    let portalRef = useRef<HTMLDivElement | undefined>();
    let forceUpdate = useForceUpdate();

    useIsomorphicLayoutEffect(() => {
      if (tempRef.current == null) {
        return;
      }

      let owner = tempRef.current.ownerDocument;
      let host = owner.body;
      let portal = owner.createElement('div');

      host.appendChild(portal);
      portalRef.current = portal;
      forceUpdate();

      return () => {
        if (host.contains(portal)) {
          host.removeChild(portal);
        }
      };
    }, [forceUpdate]);

    if (portalRef.current != null) {
      return createPortal(
        <Component ref={ref} {...props}>
          {children}
        </Component>,
        portalRef.current,
      );
    }

    return <span ref={tempRef} />;
  },
);
