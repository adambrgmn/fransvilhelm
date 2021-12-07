type CompoundRefArg<T> = React.Ref<T> | undefined | null;

/**
 * `useComposedRefs` can be used to compose an unknown amount of refs into one
 * ref callback. It is useful if you for example need a ref internally and at
 * the same time accepts a ref as a prop passed to your component.
 *
 * @param refs React ref objects or callbacks, or undefined or null
 * @returns React ref callback
 */
export function useComposedRefs<T>(
  ...refs: [CompoundRefArg<T>, ...CompoundRefArg<T>[]]
): React.RefCallback<T> {
  let callback: React.RefCallback<T> = (value) => {
    for (let ref of refs) {
      assignRef(ref, value);
    }
  };

  return callback;
}

function assignRef<T>(ref: CompoundRefArg<T>, value: T) {
  if (ref == null) return;

  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      (ref as any).current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}
