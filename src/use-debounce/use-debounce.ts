import { useState, useEffect } from 'react';

/**
 * Use this hook to debounce a value only updating it once within the given
 * delay. Useful if you need to request data when an input updates but don't
 * want to fetch the new data on every keystroke.
 *
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The value, only updated once within the given delay
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
export function useDebounce<T>(value: T, delay: number): T {
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
}
