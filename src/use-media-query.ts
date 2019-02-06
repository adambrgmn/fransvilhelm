import { useState, useEffect } from 'react';

/**
 * Test to see if a query is matched and listen for changes on that query. This
 * value will be updated if the window is resized.
 *
 * @example
 *   const isMobile = useMediaQuery('(max-width: 375px)');
 *   const isTablet = useMediaQuery('(min-width: 378px) and (max-width: 768px)');
 *
 * @param {string} query
 * @returns {boolean}
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = (evt: MediaQueryListEvent) => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};

export { useMediaQuery };
