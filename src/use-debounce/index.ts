import { useState, useEffect } from 'react';

/**
 * Use this hook to debounce a value only updating it once within the given
 * delay. Useful if you need to request data when an input updates but don't
 * want to fetch the new data on every keystroke.
 *
 * @template T The expected value
 * @param {T} value The value to debounce
 * @param {number} delay The delay in milliseconds
 * @returns {T} The value, only updated once within the given delay
 *
 * @example
 *   import { useDebounce, useInput } from '@fransvilhelm/hooks';
 *
 *   const Search = () => {
 *     const searchInput = useInput('');
 *     const debouncedValue = useDebounced(searchInput.value);
 *     const [state, result, error] = usePromise(async () => {
 *       if (!debouncedValue) return [];
 *       const res = await fetch(`/search/${debouncedValue}`);
 *       const { items } = await res.json();
 *       return items;
 *     }, [debouncedValue]);
 *
 *     return (
 *       <div>
 *         <input type="search" {...searchInput} />
 *         <h2>Search result for "{debouncedValue}"</h2>
 *         {result && result.map(item => <SearchResultItem item={item} />)}
 *       </div>
 *     );
 *   }
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };
