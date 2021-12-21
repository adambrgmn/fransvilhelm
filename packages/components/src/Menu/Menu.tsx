import { createDescendantContext } from '@fransvilhelm/descendants';
import {
  useClickOutside,
  useComposedRefs,
  useEventListener,
  useIds,
} from '@fransvilhelm/hooks';
import React, { useMemo, useRef } from 'react';

import { Popover } from '../Popover';
import { ElementProps } from '../types';
import { createStrictContext } from '../utils/context';
import { composeEventHandlers } from '../utils/event-handlers';
import { forwardRefWithAs } from '../utils/forward-ref';
import {
  useMenuMachine,
  useMenuMachineContext,
  MenuMachineContextProvider,
  MenuMachineOptions,
} from './state-machine';

const [DescendantsProvider, , useDescendants, useDescendant] =
  createDescendantContext<HTMLElement, {}>();

interface MenuContext {
  menuListRef: React.RefObject<HTMLElement>;
  buttonRef: React.RefObject<HTMLElement>;
  buttonId: string | undefined;
  menuId: string | undefined;
  generateItemId: (index: number) => string | undefined;
}

const [MenuContextProvider, useMenuContext] = createStrictContext<MenuContext>({
  name: 'MenuContext',
  errorMessage: 'useMenuContext can only be used within a MenuContextProvider.',
});

export function useMenu(options: Partial<Omit<MenuMachineOptions, 'manager'>>) {
  let menuListRef = useRef<HTMLElement>(null);
  let buttonRef = useRef<HTMLElement>(null);
  let [buttonId, menuId, itemIdBase] = useIds(
    'menu-button',
    'menu-list',
    'menu-item',
  );

  const returnFocus = () => buttonRef.current;

  let manager = useDescendants();
  let machine = useMenuMachine({
    manager,
    closeOnClick: true,
    returnFocus,
    ...options,
  });

  let [state, send] = machine;

  let context = useMemo<MenuContext>(
    () => ({
      menuListRef,
      buttonRef,
      buttonId,
      menuId,
      generateItemId: (index) => {
        return itemIdBase && index > -1 ? `${itemIdBase}-${index}` : undefined;
      },
    }),
    [buttonId, itemIdBase, menuId],
  );

  useClickOutside(menuListRef, (event) => {
    if (
      event.target instanceof HTMLElement &&
      (event.target === buttonRef.current ||
        buttonRef.current?.contains(event.target))
    ) {
      return;
    }

    send.close();
  });

  useEventListener('keydown', (event) => {
    if (!state.matches('expanded')) return;

    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        if (event.shiftKey) {
          send.previous();
        } else {
          send.next();
        }
        return;

      case 'ArrowDown':
        send.next();
        return;

      case 'ArrowUp':
        send.previous();
        return;

      case 'Escape':
        send.close();
        return;
    }
  });

  return { manager, machine, context } as const;
}

type MenuProps = Partial<Omit<MenuMachineOptions, 'manager'>>;

export const Menu: React.FC<MenuProps> = ({ children, ...props }) => {
  let { manager, machine, context } = useMenu(props);

  return (
    <DescendantsProvider value={manager}>
      <MenuMachineContextProvider value={machine}>
        <MenuContextProvider value={context}>{children}</MenuContextProvider>
      </MenuMachineContextProvider>
    </DescendantsProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}

function useMenuButton(
  forwardedProps: ElementProps<'button'>,
  forwardedRef?: React.ForwardedRef<HTMLElement>,
) {
  let [state, send] = useMenuMachineContext();
  let { buttonRef, buttonId, menuId } = useMenuContext();
  let ref = useComposedRefs(forwardedRef, buttonRef);

  let props: ElementProps<'button'> = {
    ...forwardedProps,

    id: buttonId,
    type: 'button',

    'aria-expanded': state.matches('expanded'),
    'aria-haspopup': 'menu',
    'aria-controls': menuId,

    onClick: composeEventHandlers(forwardedProps.onClick, () => send.toggle()),
  };

  return [ref, props] as const;
}

export const Button = forwardRefWithAs<{}, 'button'>(
  ({ as: Component = 'button', children, ...props }, forwardedRef) => {
    let [ref, menuButtonProps] = useMenuButton(props, forwardedRef);

    return (
      <Component {...menuButtonProps} ref={ref}>
        {children}
      </Component>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

export function useMenuList(
  forwardedProps: ElementProps<'div'>,
  forwardedRef?: React.ForwardedRef<HTMLDivElement>,
) {
  let [state] = useMenuMachineContext();
  let { menuListRef, buttonRef, menuId } = useMenuContext();
  let ref = useComposedRefs(forwardedRef, menuListRef);

  let props: Omit<React.ComponentProps<typeof Popover>, 'children'> = {
    ...forwardedProps,

    id: menuId,
    targetRef: buttonRef,
    hidden: state.matches('idle'),
    tabIndex: -1,

    role: 'menu',
    'aria-orientation': 'vertical',
  };

  return [ref, props] as const;
}

export const List = forwardRefWithAs<{}, 'div'>(
  ({ as = 'div', children, ...props }, forwardedRef) => {
    let [ref, popoverProps] = useMenuList(props, forwardedRef);

    return (
      <Popover {...popoverProps} ref={ref}>
        {children}
      </Popover>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  List.displayName = 'List';
}

export function useMenuItem(
  forwardedProps: ElementProps<'a'>,
  forwardedRef: React.ForwardedRef<HTMLAnchorElement>,
): [React.RefCallback<HTMLAnchorElement>, ElementProps<'a'>];
export function useMenuItem(
  forwardedProps: ElementProps<'button'>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
): [React.RefCallback<HTMLButtonElement>, ElementProps<'button'>];
export function useMenuItem(
  forwardedProps: ElementProps<'button'> | ElementProps<'a'>,
  forwardedRef:
    | React.ForwardedRef<HTMLButtonElement>
    | React.ForwardedRef<HTMLAnchorElement>,
) {
  let [, send] = useMenuMachineContext();
  let { register, index } = useDescendant({
    disabled: 'disabled' in forwardedProps ? !!forwardedProps.disabled : false,
  });

  let { generateItemId } = useMenuContext();

  let ref = useComposedRefs(forwardedRef, register);

  let props: ElementProps<'button'> | ElementProps<'a'> = {
    ...forwardedProps,
    id: generateItemId(index),
    role: 'menuitem',

    onClick: composeEventHandlers(forwardedProps.onClick, () =>
      send.click(index),
    ),
  };

  return [ref, props] as const;
}

export const Item = forwardRefWithAs<{}, 'button'>(
  ({ as: Component = 'button', children, ...props }, forwardedRef) => {
    let [ref, menuItemProps] = useMenuItem(props, forwardedRef);

    return (
      <Component {...menuItemProps} ref={ref}>
        {children}
      </Component>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Item.displayName = 'Item';
}

export const Link = forwardRefWithAs<{}, 'a'>(
  ({ as: Component = 'a', children, ...props }, forwardedRef) => {
    let [ref, menuItemProps] = useMenuItem(props, forwardedRef);

    return (
      <Component {...menuItemProps} ref={ref}>
        {children}
      </Component>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Link.displayName = 'Link';
}
