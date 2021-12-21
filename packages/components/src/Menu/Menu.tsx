import { createDescendantContext } from '@fransvilhelm/descendants';
import { useClickOutside, useComposedRefs, useIds } from '@fransvilhelm/hooks';
import React, { useMemo, useRef } from 'react';

import { Popover } from '../Popover';
import { createStrictContext } from '../utils/context';
import { forwardRefWithAs } from '../utils/forward-ref';
import {
  useMenuMachine,
  useMenuMachineContext,
  MenuMachineContextProvider,
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

export const Menu: React.FC = ({ children }) => {
  let manager = useDescendants();
  let machine = useMenuMachine({ manager });
  let [state, send] = machine;

  let menuListRef = useRef<HTMLElement>(null);
  let buttonRef = useRef<HTMLElement>(null);
  let [buttonId, menuId, itemIdBase] = useIds(
    'menu-button',
    'menu-list',
    'menu-item',
  );

  let menuContext = useMemo<MenuContext>(
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

    send.toggle();
  });

  return (
    <DescendantsProvider value={manager}>
      <MenuMachineContextProvider value={machine}>
        <MenuContextProvider value={menuContext}>
          {children}
          <pre>{JSON.stringify(state.context, null, 2)}</pre>
        </MenuContextProvider>
      </MenuMachineContextProvider>
    </DescendantsProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}

export const Button = forwardRefWithAs<{}, 'button'>(
  ({ as: Component = 'button', children, ...props }, forwardedRef) => {
    let [state, send] = useMenuMachineContext();
    let { buttonRef, buttonId, menuId } = useMenuContext();
    let ref = useComposedRefs(forwardedRef, buttonRef);

    return (
      <Component
        id={buttonId}
        ref={ref}
        type="button"
        {...props}
        aria-expanded={state.matches('expanded')}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => send.toggle()}
      >
        {children}
      </Component>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

export const List = forwardRefWithAs<{}, 'div'>(
  ({ as = 'div', children, ...props }, forwardedRef) => {
    let [state] = useMenuMachineContext();
    let { menuListRef, buttonRef, menuId } = useMenuContext();
    let ref = useComposedRefs(forwardedRef, menuListRef);

    return (
      <Popover
        id={menuId}
        ref={ref}
        as={as}
        targetRef={buttonRef}
        {...props}
        hidden={state.matches('idle')}
        tabIndex={-1}
        role="menu"
        aria-orientation="vertical"
      >
        {children}
      </Popover>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  List.displayName = 'List';
}

export const Item = forwardRefWithAs<{}, 'button'>(
  (
    { as: Component = 'button', children, disabled = false, ...props },
    forwardedRef,
  ) => {
    let { register, index } = useDescendant({ disabled });
    let { generateItemId } = useMenuContext();

    let ref = useComposedRefs(forwardedRef, register);

    return (
      <Component
        id={generateItemId(index)}
        ref={ref}
        type="button"
        {...props}
        role="menuitem"
      >
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
    let { register, index } = useDescendant({ disabled: false });
    let { generateItemId } = useMenuContext();

    let ref = useComposedRefs(forwardedRef, register);
    return (
      <Component id={generateItemId(index)} ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Link.displayName = 'Link';
}
