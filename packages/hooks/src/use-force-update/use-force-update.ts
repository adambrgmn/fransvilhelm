import { useCallback, useState } from 'react';

import { useIsMounted } from '../use-is-mounted';

export function useForceUpdate() {
  const [, setState] = useState(0);
  const isMounted = useIsMounted();

  const callback = useCallback(() => {
    if (isMounted()) {
      setState((c) => c + 1);
    }
  }, [isMounted]);

  return callback;
}
