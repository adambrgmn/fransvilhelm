import { useState } from 'react';

interface UseCheckboxResult {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Get necessary props to handle a checkbox. The hook returns a checked value
 * and an onChange handler.
 *
 * @param {boolean} [initialValue=false] Initial checked value
 * @returns {UseCheckboxResult} Current checked value and an onChange handler
 *
 * @example
 *   const Checkbox = () => {
 *     const checkbox = useCheckbox(true);
 *     return <input type="checkbox" checked={checkbox.checked} onChange={checkbox.onChange} />
 *     // Or spread props for easier use: <input type="checkbox" {...checkbox} />
 *   };
 */
const useCheckbox = (
  initialValue: boolean = false,
  _onChange?: (checked: boolean) => void,
): UseCheckboxResult => {
  const [checked, setChecked] = useState(initialValue);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    _onChange?.(event.currentTarget.checked);
    setChecked(event.currentTarget.checked);
  };

  return { checked, onChange };
};

export { useCheckbox };
