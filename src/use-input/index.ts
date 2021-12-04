import { useState } from 'react';

interface UseInputResult {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Get necessary props to handle an input. The hook returns a value and an
 * onChange handler.
 *
 * @param initialValue Initial value of input
 * @param callback Optional callback that will be called on changes with next state of the input
 * @returns Current value and onChange handler
 *
 * @example
 *   const Input = () => {
 *     const input = useInput('foo');
 *     return <input value={input.value} onChange={input.onChange} />
 *     // Or spread props for easier use: <input {...input} />
 *   };
 */
export function useInput(
  initialValue: string = '',
  callback?: (value: string) => void,
): UseInputResult {
  const [value, setValue] = useState(initialValue);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    callback?.(event.currentTarget.value);
    setValue(event.currentTarget.value);
  };

  return { value, onChange };
}
