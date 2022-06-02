import { InternalRefArg } from '../types';
import { assignRef } from '../utils';

/**
 * `useComposedRefs` can be used to compose an unknown amount of refs into one
 * ref callback. It is useful if you for example need a ref internally and at
 * the same time accepts a ref as a prop passed to your component.
 *
 * @param refs React ref objects or callbacks, or undefined or null
 * @returns React ref callback
 */
export function useComposedRefs<T>(...refs: [InternalRefArg<T>, ...InternalRefArg<T>[]]): React.RefCallback<T> {
  let callback: React.RefCallback<T> = (value) => {
    for (let ref of refs) {
      assignRef(ref, value);
    }
  };

  return callback;
}
