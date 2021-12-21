interface FocusOptions {
  nextTick?: boolean;
  preventScroll?: boolean;
}

export function applyFocus(
  element: HTMLElement | null | undefined,
  { nextTick = false, preventScroll = true }: FocusOptions,
) {
  function focus() {
    if (element == null) return;
    element.focus({ preventScroll });
  }

  if (nextTick) {
    return window.requestAnimationFrame(focus);
  }

  focus();
  return -1;
}
