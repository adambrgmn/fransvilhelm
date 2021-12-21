import { DescendantsManager } from '@fransvilhelm/descendants';
import { useMachine } from '@xstate/react';
import { useMemo } from 'react';
import { ContextFrom } from 'xstate';
import { createModel } from 'xstate/lib/model';

import { createStrictContext } from '../utils/context';
import { applyFocus } from '../utils/focus';

const menuModel = createModel(
  {
    manager: undefined as unknown as DescendantsManager<HTMLElement, {}>,

    // State
    activeIndex: -1,

    // Callbacks
    returnFocus: (() => null) as unknown as () =>
      | HTMLElement
      | null
      | undefined,

    // Config options
    closeOnClick: true,
  },
  {
    events: {
      toggle: () => ({}),
      close: () => ({}),
      click: (index: number) => ({ index }),
      next: () => ({}),
      previous: () => ({}),
    },
  },
);

export type MenuMachineContextType = ContextFrom<typeof menuMachine>;

const menuMachine = menuModel.createMachine(
  {
    context: menuModel.initialContext,
    strict: true,
    initial: 'idle',
    states: {
      idle: {
        on: {
          toggle: {
            target: 'expanded',
            actions: menuModel.assign({
              activeIndex: () => 0,
            }),
          },
        },
      },
      expanded: {
        entry: 'focusInitial',
        exit: 'returnFocus',
        on: {
          toggle: {
            target: 'idle',
            actions: menuModel.assign({ activeIndex: () => -1 }),
          },
          close: {
            target: 'idle',
            actions: menuModel.assign({ activeIndex: () => -1 }),
          },
          click: [{ target: 'idle', cond: 'shouldCloseOnClick' }],
          next: {
            actions: [
              menuModel.assign({
                activeIndex: (context) => {
                  let next = context.manager.nextEnabled(context.activeIndex);
                  applyFocus(next?.node, { nextTick: true });
                  return next?.index ?? -1;
                },
              }),
            ],
          },
          previous: {
            actions: [
              menuModel.assign({
                activeIndex: (context) => {
                  let prev = context.manager.prevEnabled(context.activeIndex);
                  applyFocus(prev?.node, { nextTick: true });
                  return prev?.index ?? -1;
                },
              }),
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      focusInitial: (context) => {
        let descendant = context.manager.enabledItem(context.activeIndex);
        applyFocus(descendant?.node, { nextTick: true });
      },
      returnFocus: (context) => {
        let to = context.returnFocus();
        applyFocus(to, { nextTick: true });
      },
    },
    guards: {
      shouldCloseOnClick: (context) => context.closeOnClick,
    },
  },
);

export type MenuModelEvents = typeof menuModel.events;
export type MenuMachineContext = ReturnType<typeof useMenuMachine>;

export type MenuMachineOptions = Omit<MenuMachineContextType, 'activeIndex'>;

export function useMenuMachine(options: MenuMachineOptions) {
  let [state, send] = useMachine(menuMachine, {
    context: options,
  });

  let events = useMemo<MenuModelEvents>(() => {
    let eventsObject: Record<string, any> = {};
    for (let [key, event] of Object.entries(menuModel.events)) {
      eventsObject[key] = (action: any) => send(event(action));
    }

    return eventsObject as MenuModelEvents;
  }, [send]);

  return useMemo(() => [state, events] as const, [events, state]);
}

export const [MenuMachineContextProvider, useMenuMachineContext] =
  createStrictContext<MenuMachineContext>({
    name: 'MenuMachineContextProvider',
    errorMessage:
      'useMenuMachineContext must be used within a MenuMachineContextProvider',
  });
