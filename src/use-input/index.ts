import { useState } from 'react';

interface UseInputResult {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
const useInput = (
  initialValue: string = '',
  _onChange?: (value: string) => void,
): UseInputResult => {
  const [value, setValue] = useState(initialValue);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    _onChange?.(event.currentTarget.value);
    setValue(event.currentTarget.value);
  };

  return { value, onChange };
};

export { useInput };
