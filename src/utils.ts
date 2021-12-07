import { useLayoutEffect, useEffect } from 'react';

import { InternalRefArg } from './types';

export function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const useIsomorphicLayoutEffect = canUseDOM()
  ? useLayoutEffect
  : useEffect;

type RectProps = {
  rect: DOMRect | undefined;
  hasRectChanged: boolean;
  callbacks: Function[];
};

let rectProps: (keyof DOMRect)[] = [
  'height',
  'width',
  'top',
  'bottom',
  'left',
  'right',
];

let rectChanged = (a: DOMRect = {} as DOMRect, b: DOMRect = {} as DOMRect) => {
  return rectProps.some((prop) => a[prop] !== b[prop]);
};

let observedNodes = new Map<Element, RectProps>();
let rafId: number;

let run = () => {
  const changesStates: RectProps[] = [];
  observedNodes.forEach((state, node) => {
    let newRect = node.getBoundingClientRect();
    if (rectChanged(newRect, state.rect)) {
      state.rect = newRect;
      changesStates.push(state);
    }
  });

  changesStates.forEach((state) => {
    state.callbacks.forEach((cb) => cb(state.rect));
  });

  rafId = window.requestAnimationFrame(run);
};

export function observeRect(node: Element, cb: (rect: DOMRect) => void) {
  return {
    observe() {
      let wasEmpty = observedNodes.size === 0;
      if (observedNodes.has(node)) {
        observedNodes.get(node)!.callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: undefined,
          hasRectChanged: false,
          callbacks: [cb],
        });
      }

      if (wasEmpty) {
        run();
      }
    },
    unobserve() {
      let state = observedNodes.get(node);
      if (state) {
        let index = state.callbacks.findIndex((callback) => callback === cb);
        if (index > 0) state.callbacks.splice(index, 1);
        if (state.callbacks.length === 0) observedNodes.delete(node);
        if (observedNodes.size === 0) window.cancelAnimationFrame(rafId);
      }
    },
  };
}

export function assignRef<T>(ref: InternalRefArg<T>, value: T) {
  if (ref == null) return;

  if (typeof ref === 'function') {
    ref(value);
  } else {
    Reflect.set(ref, 'current', value);
  }
}
