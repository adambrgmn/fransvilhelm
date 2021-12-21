interface FocusOptions {
  preventScroll?: boolean;
}

export function applyFocus(
  element: HTMLElement | null | undefined,
  { preventScroll = true }: FocusOptions = {},
) {
  function focus() {
    if (element == null) return;
    element.focus({ preventScroll });
  }

  return window.requestAnimationFrame(focus);
}
