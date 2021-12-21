// Same implementation as reach ui, but with the conditional export of react's
// own useId hook, if it exists.

import React, { useEffect, useState } from 'react';

import { useIsomorphicLayoutEffect } from '../utils';

let serverHandoffComplete = false;
let id = 0;
const genId = () => ++id;

function _useId() {
  const initialId = serverHandoffComplete ? genId() : null;
  const [id, setId] = useState(initialId);

  useIsomorphicLayoutEffect(() => {
    if (id == null) {
      setId(genId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  }, []);

  return id != null ? String(id) : undefined;
}

export const useId = 'useId' in React ? React.useId : _useId;

export function useIds(...prefixes: string[]) {
  const id = useId();
  return prefixes.map((prefix) => (id == null ? '' : `${prefix}-${id}`));
}
