export function composeEventHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: Parameters<T>[0]) {
    fns.some((fn) => {
      if (fn != null) fn(event);
      return event?.defaultPrevented;
    });
  };
}
