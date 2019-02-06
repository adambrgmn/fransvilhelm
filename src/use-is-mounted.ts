import { useRef, useEffect } from 'react';

/**
 * Use this hook to determine if a component is still mounted or not. This is
 * probably an anti-pattern but can be useful when trying to use promises inside
 * a hook to not risk setting state on an unmounted component.
 *
 * @example
 *   const Username = ({ id }) => {
 *     const isMounted = useIsMounted();
 *     const [username, setUsername] = useState('');
 *
 *     useEffect(() => {
 *       fetch('/get-username')
 *         .then(res => res.json())
 *         .then(json => {
 *           // When we arrive here the component might have already been
 *           // unmounted. Therefore we have to guard against that.
 *           if (isMounted()) setUsername(json.username);
 *         });
 *     }, []);
 *
 *     return <p>Username: {username}</p>
 *   };
 *
 * @returns {() => boolean} A function that tells if a component is mounted or not
 */
const useIsMounted = (): (() => boolean) => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
    return () => (ref.current = false);
  }, []);

  return () => ref.current;
};

export { useIsMounted };