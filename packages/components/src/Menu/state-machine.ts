import { DescendantsManager } from '@fransvilhelm/descendants';
import { useMachine } from '@xstate/react';
import { useMemo } from 'react';
import { createModel } from 'xstate/lib/model';

import { createStrictContext } from '../utils/context';

const menuModel = createModel(
  {
    activeIndex: -1,
    manager: undefined as unknown as DescendantsManager<HTMLElement, {}>,
  },
  {
    events: {
      toggle: () => ({}),
      select: (index: number) => ({ index }),
    },
  },
);

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
        on: {
          toggle: {
            target: 'idle',
            actions: menuModel.assign({
              activeIndex: () => -1,
            }),
          },
          select: {
            actions: menuModel.assign({
              activeIndex: (_, event) => event.index,
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      focusInitial: (context) => {
        let descendant = context.manager.enabledItem(context.activeIndex);
        if (descendant != null) {
          descendant.node.focus();
        }
      },
    },
  },
);

export type MenuModelEvents = typeof menuModel.events;
export type MenuMachineContext = ReturnType<typeof useMenuMachine>;

interface MenuMachineOptions {
  manager: DescendantsManager<HTMLElement, {}>;
}

export function useMenuMachine(options: MenuMachineOptions) {
  let [state, send] = useMachine(menuMachine, {
    context: { manager: options.manager },
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
