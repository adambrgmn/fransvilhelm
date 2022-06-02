import React, { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useForceUpdate, useIsomorphicLayoutEffect } from '@fransvilhelm/hooks';

interface PortalProps {
  type?: string;
  containerRef?: React.RefObject<Node>;
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ type = 'fransvilhelm-portal', containerRef, children }) => {
  let { mountNode, portalNode } = usePortal({ type, containerRef });

  if (portalNode.current != null) {
    return createPortal(children, portalNode.current);
  }

  return <span ref={mountNode} />;
};

if (process.env.NODE_ENV !== 'production') {
  Portal.displayName = 'Portal';
}

export function usePortal({ type = 'fransvilhelm-portal', containerRef }: Omit<PortalProps, 'children'>) {
  let mountNode = useRef<HTMLDivElement | null>(null);
  let portalNode = useRef<HTMLElement | null>(null);
  let forceUpdate = useForceUpdate();

  useIsomorphicLayoutEffect(() => {
    if (mountNode.current == null) return;

    let ownerDocument = mountNode.current.ownerDocument;
    let body = containerRef?.current ?? ownerDocument.body;

    portalNode.current = ownerDocument.createElement(type);
    body.appendChild(portalNode.current);
    forceUpdate();

    return () => {
      if (portalNode.current && body) {
        body.removeChild(portalNode.current);
      }
    };
  }, [containerRef, forceUpdate, type]);

  return { portalNode, mountNode } as const;
}
