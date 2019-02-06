import { useState } from 'react';

interface UseCheckboxResult {
  checked: boolean;
  onChange: React.FormEventHandler<HTMLInputElement>;
}

/**
 * Get necessary props to handle a checkbox. The hook returns a checked value
 * and an onChange handler.
 *
 * @example
 *   const checkbox = useCheckbox(true);
 *   return <input type="checkbox" checked={checkbox.checked} onChange={checkbox.onChange} />
 *   // Or spread props for easier use: <input type="checkbox" {...checkbox} />
 *
 * @param {boolean} [initialValue=false] Initial checked value
 * @returns {UseCheckboxResult} Current checked value and an onChange handler
 */
const useCheckbox = (initialValue: boolean = false): UseCheckboxResult => {
  const [checked, setChecked] = useState(initialValue);
  const onChange = () => setChecked(!checked);

  return { checked, onChange };
};

export { useCheckbox };