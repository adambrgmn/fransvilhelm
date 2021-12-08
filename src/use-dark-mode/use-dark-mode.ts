import { SetState } from '../types';
import { useMediaQuery } from '../use-media-query';
import { usePersistedState } from '../use-persisted-state';
import { useIsomorphicLayoutEffect } from '../utils';

/**
 * Use this hook to control the user dark mode preference. By default it will
 * rely only on the users settings via css media queries. But it is also
 * possible to override and control this behaviour.

 * @param className Optional class name to append to body element
 */
export function useDarkMode(
  className?: string,
): [boolean, SetState<boolean | null>, boolean] {
  const [enabled, setEnabled] = usePersistedState<boolean | null>(
    null,
    'dark-mode',
  );

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let isUserOverridden = enabled != null;
  let active = enabled != null ? enabled : prefersDarkMode;

  useIsomorphicLayoutEffect(() => {
    if (className && active) {
      let element = window.document.body;
      element.classList.add(className);
      return () => {
        element.classList.remove(className);
      };
    }
  }, [active]);

  return [active, setEnabled, isUserOverridden];
}
