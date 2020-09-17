import * as React from 'react';

import { usePromise } from './';
import { AsyncState } from '../shared';

const users: { [key: string]: string } = {
  'id-0': 'adambrgmn',
  'id-1': 'ammender',
  'id-2': 'force-push-master',
};

const getUsername = (userId: string): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const username = users[userId];
      if (!username) {
        reject(new Error(`Could not find user with id: ${userId}`));
      } else {
        resolve(username);
      }
    }, 1500);
  });

const UsePromiseExample = (): JSX.Element => {
  const [id, setId] = React.useState(0);
  const [state, username, error] = usePromise(() => getUsername(`id-${id}`), [
    id,
  ]);

  return (
    <div>
      <div>
        {[0, 1, 2, 3].map((idx) => (
          <div key={idx}>
            <input
              type="radio"
              name="id"
              id={`id-${idx}`}
              checked={idx === id}
              onChange={() => setId(idx)}
            />
            <label htmlFor={`id-${idx}`}>Get username for id-{idx}</label>
          </div>
        ))}
      </div>
      {(state === AsyncState.initial || state === AsyncState.pending) && (
        <div>Loading...</div>
      )}
      {state === AsyncState.rejected && <div>Error: {error.message}</div>}
      {state === AsyncState.fullfilled && (
        <div>
          Username: <strong>{username}</strong>
        </div>
      )}
    </div>
  );
};

export { UsePromiseExample };
