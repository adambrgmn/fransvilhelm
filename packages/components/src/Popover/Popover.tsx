import { useRef } from 'react';

import { PRect, useComposedRefs, useDimensions } from '@fransvilhelm/hooks';

import { Portal } from '../Portal';
import { forwardRefWithAs } from '../utils/forward-ref';

type PossibleNode = null | undefined | HTMLElement | SVGElement;
export type PopoverPosition = (
  targetRect?: PRect | null,
  popoverRect?: PRect | null,
  ...unstable_observableNodes: PossibleNode[]
) => React.CSSProperties;

export interface PopoverProps {
  targetRef: React.RefObject<PossibleNode>;
  position?: PopoverPosition;
  hidden?: boolean;
  children: React.ReactNode;
}

export const Popover = forwardRefWithAs<PopoverProps, 'div'>((props, ref) => {
  return (
    <Portal>
      <InternalPopover ref={ref} {...props} />
    </Portal>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}

const InternalPopover = forwardRefWithAs<PopoverProps, 'div'>(
  ({ as: Comp = 'div', targetRef, position = positionDefault, hidden, children, ...props }, forwardedRef) => {
    let popoverRef = useRef<HTMLDivElement>(null);
    let popoverRect = useDimensions(popoverRef, !hidden);
    let targetRect = useDimensions(targetRef, !hidden);

    let ref = useComposedRefs(popoverRef, forwardedRef);

    return (
      <Comp
        ref={ref}
        hidden={hidden}
        {...props}
        style={{
          position: 'absolute',
          ...getStyles(position, targetRect, popoverRect),
          ...props.style,
        }}
      >
        {children}
      </Comp>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  InternalPopover.displayName = 'InternalPopover';
}

function getStyles(
  position: PopoverPosition,
  targetRect: PRect | null,
  popoverRect: PRect | null,
): React.CSSProperties {
  return popoverRect ? position(targetRect, popoverRect) : { visibility: 'hidden' };
}

function getTopPosition(targetRect: PRect, popoverRect: PRect, isDirectionUp: boolean) {
  return {
    top: isDirectionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset}px`,
  };
}

export const positionDefault: PopoverPosition = (targetRect, popoverRect) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  const { directionRight, directionUp } = getCollisions(targetRect, popoverRect);
  return {
    left: directionRight
      ? `${targetRect.right - popoverRect.width + window.pageXOffset}px`
      : `${targetRect.left + window.pageXOffset}px`,
    ...getTopPosition(targetRect, popoverRect, directionUp),
  };
};

export const positionRight: PopoverPosition = (targetRect, popoverRect) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  const { directionLeft, directionUp } = getCollisions(targetRect, popoverRect);
  return {
    left: directionLeft
      ? `${targetRect.left + window.pageXOffset}px`
      : `${targetRect.right - popoverRect.width + window.pageXOffset}px`,
    ...getTopPosition(targetRect, popoverRect, directionUp),
  };
};

export const positionMatchWidth: PopoverPosition = (targetRect, popoverRect) => {
  if (!targetRect || !popoverRect) {
    return {};
  }

  const { directionUp } = getCollisions(targetRect, popoverRect);
  return {
    width: targetRect.width,
    left: targetRect.left,
    ...getTopPosition(targetRect, popoverRect, directionUp),
  };
};

function getCollisions(targetRect: PRect, popoverRect: PRect, offsetLeft: number = 0, offsetBottom: number = 0) {
  const collisions = {
    top: targetRect.top - popoverRect.height < 0,
    right: window.innerWidth < targetRect.left + popoverRect.width - offsetLeft,
    bottom: window.innerHeight < targetRect.bottom + popoverRect.height - offsetBottom,
    left: targetRect.left + targetRect.width - popoverRect.width < 0,
  };

  const directionRight = collisions.right && !collisions.left;
  const directionLeft = collisions.left && !collisions.right;
  const directionUp = collisions.bottom && !collisions.top;
  const directionDown = collisions.top && !collisions.bottom;

  return { directionRight, directionLeft, directionUp, directionDown };
}
