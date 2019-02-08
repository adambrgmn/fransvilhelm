import { useState } from 'react';

interface UseInputResult {
  value: string;
  onChange: React.FormEventHandler<HTMLInputElement>;
}

/**
 * Get necessary props to handle an input. The hook returns a value and an
 * onChange handler.
 *
 * @param {string} [initialValue=''] Initial value of input
 * @returns {UseInputResult} Current value and onChange handler
 *
 * @example
 *   const Input = () => {
 *     const input = useInput('foo');
 *     return <input value={input.value} onChange={input.onChange} />
 *     // Or spread props for easier use: <input {...input} />
 *   };
 */
const useInput = (initialValue: string = ''): UseInputResult => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value);
  };

  return { value, onChange };
};

export { useInput };
