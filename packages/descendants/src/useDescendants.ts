import {
  useComposedRefs,
  useIsomorphicLayoutEffect,
  useLazyInit,
} from '@fransvilhelm/hooks';
import { useRef, useState } from 'react';

import { DescendantsManager, DescendantOptions } from './DescendantsManager';
import { createStrictContext } from './utils';

type UseDescendantReturn<
  DescendantNode extends HTMLElement = HTMLElement,
  DescendantData extends Record<string, unknown> = {},
> = {
  manager: DescendantsManager<DescendantNode, DescendantData>;
  register: React.RefCallback<DescendantNode>;
  index: number;
  enabledIndex: number;
};

type DescendantsReturn<
  DescendantNode extends HTMLElement = HTMLElement,
  DescendantData extends Record<string, unknown> = {},
> = [
  React.FC<{ value: DescendantsManager<DescendantNode, DescendantData> }>,
  () => DescendantsManager<DescendantNode, DescendantData>,
  () => DescendantsManager<DescendantNode, DescendantData>,
  (
    options?: DescendantOptions<DescendantData>,
  ) => UseDescendantReturn<DescendantNode, DescendantData>,
];

export function createDescendantContext<
  DescendantNode extends HTMLElement = HTMLElement,
  DescendantData extends Record<string, unknown> = {},
>(): DescendantsReturn<DescendantNode, DescendantData> {
  const [DescendantContextProvider, useDescendantContext] = createStrictContext<
    DescendantsManager<DescendantNode, DescendantData>
  >({
    name: 'DescendantContextProvider',
    errorMessage:
      'useDescendantsContext must be used within DescendantContextProvider',
  });

  function useDescendants() {
    let manager = useLazyInit(
      () => new DescendantsManager<DescendantNode, DescendantData>(),
    );

    useIsomorphicLayoutEffect(() => {
      return () => manager.destroy();
    }, [manager]);

    return manager;
  }

  function useDescendant(
    options?: DescendantOptions<DescendantData>,
  ): UseDescendantReturn<DescendantNode, DescendantData> {
    let manager = useDescendantContext();
    let [index, setIndex] = useState(-1);
    let ref = useRef<DescendantNode>(null);

    let refCallback: React.RefCallback<DescendantNode> = options
      ? manager.register(options)
      : manager.register.bind(manager);

    let register = useComposedRefs(ref, refCallback);

    useIsomorphicLayoutEffect(() => {
      return () => {
        if (ref.current == null) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        manager.unregister(ref.current);
      };
    }, [manager]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useIsomorphicLayoutEffect(() => {
      if (ref.current == null) return;

      let dataIndex = Number(ref.current.dataset.index);
      if (index !== dataIndex && !Number.isNaN(dataIndex)) {
        setIndex(dataIndex);
      }
    });

    return {
      manager,
      register,
      index,
      enabledIndex: manager.enabledIndexOf(ref.current),
    };
  }

  return [
    DescendantContextProvider,
    useDescendantContext,
    useDescendants,
    useDescendant,
  ];
}
