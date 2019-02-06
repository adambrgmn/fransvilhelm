import { useState, useEffect } from 'react';

/**
 * Test to see if a query is matched and listen for changes on that query. This
 * value will be updated if the window is resized.
 *
 * @param {string} query Query string like used in css
 * @returns {boolean} True if query condition is met or not, false otherwise
 *
 * @example
 *   const Device = () => {
 *     const isMobile = useMediaQuery('(max-width: 375px)');
 *     const isTablet = useMediaQuery('(min-width: 378px) and (max-width: 768px)');
 *
 *     if (isMobile) return <p>You're on a mobile right now</p>;
 *     if (isTablet) return <p>You're on a tablet right now</p>;
 *     return <p>You're on a desktop computer right now</p>;
 *   };
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
