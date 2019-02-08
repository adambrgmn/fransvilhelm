import * as React from 'react';
import { useIsMounted } from '../../use-is-mounted';
import { useCheckbox } from '../../use-checkbox';

const getUsername = (): Promise<string> =>
  new Promise(resolve => {
    setTimeout(() => resolve('adambrgmn'), 2000);
  });

const SafeUsername = (): JSX.Element => {
  const isMounted = useIsMounted();
  const [username, setUsername] = React.useState('[loading]');

  React.useEffect(() => {
    console.log('Safe: fetching username');
    getUsername().then(u => {
      if (isMounted()) {
        console.log('Safe: fetched username and will update state');
        setUsername(u);
      } else {
        console.log(
          'Safe: fetched username, but will not update state, since component is unmounted',
        );
      }
    });

    return () => {
      console.log('Safe: component unmounted');
    };
  }, []);

  return <span>{username}</span>;
};

const UnsafeUsername = (): JSX.Element => {
  const [username, setUsername] = React.useState('[loading]');

  React.useEffect(() => {
    console.log('Unsafe: fetching username');
    getUsername().then(u => {
      console.log('Unsafe: username fetched will update state regardless');
      setUsername(u);
    });

    return () => {
      console.log('Unsafe: component unmounted');
    };
  }, []);

  return <span>{username}</span>;
};

const UseIsMountedExample = (): JSX.Element => {
  const safeCheckbox = useCheckbox(false);
  const unsafeCheckbox = useCheckbox(false);

  return (
    <div>
      <div>
        <p>
          Open the developer tools in your browser. And toggle the checkboxes to
          reveal the two components.
        </p>
        <p>
          Notice that if you quickly untoggle the "unsafe" version it will log
          an error saying that we're trying to setState on an unmounted
          component. But that wont happen on the safe version.
        </p>
      </div>
      <div>
        <input type="checkbox" id="safe" {...safeCheckbox} />
        <label htmlFor="safe">Show safe Username</label>
      </div>
      <div>{safeCheckbox.checked && <SafeUsername />}</div>
      <div>
        <input type="checkbox" id="unsafe" {...unsafeCheckbox} />
        <label htmlFor="unsafe">Show unsafe Username</label>
      </div>
      <div>{unsafeCheckbox.checked && <UnsafeUsername />}</div>
    </div>
  );
};

export { UseIsMountedExample };
