import * as React from 'react';
import { useTaskRunner } from './';
import { AsyncState } from '../shared';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
async function sendLater<T>(val: T): Promise<T> {
  await delay(1000);
  return val;
}

const RunTasks = ({
  taskDefs,
  abortOnReject,
}: {
  taskDefs: any[];
  abortOnReject: boolean;
}) => {
  const tasks = useTaskRunner(taskDefs, { abortOnReject });
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span>{task.title}: </span>
          {task.state === AsyncState.initial && (
            <span style={{ color: 'gray' }}>waiting</span>
          )}
          {task.state === AsyncState.pending && (
            <span style={{ color: 'gray' }}>pending</span>
          )}
          {task.state === AsyncState.fullfilled && (
            <span style={{ color: 'green' }}>{task.value}</span>
          )}
          {task.state === AsyncState.rejected && (
            <span style={{ color: 'red' }}>{task.error.message}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

const tasks = [
  {
    title: 'Get user 1',
    action: () => sendLater('adambrgmn'),
  },
  {
    title: 'Get user 2',
    action: () => sendLater('ammender'),
  },
  {
    title: 'Get user 3',
    action: async () => {
      await delay(1000);
      throw new Error('Failed to get username for user 4');
    },
  },
  {
    title: 'Get user 4',
    action: () => sendLater('force-push-master'),
  },
  {
    title: 'Get user 5',
    action: () => sendLater('rebaze'),
  },
];

const UseTaskRunnerExample = (): JSX.Element => {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (!show) {
      const id = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(id);
    }
  }, [show]);

  return (
    <>
      <button onClick={() => setShow(false)}>Rerun</button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {show && (
          <>
            <div style={{ width: '50%' }}>
              <h2>Skipping rejected tasks</h2>
              <RunTasks taskDefs={tasks} abortOnReject={false} />
            </div>
            <div style={{ width: '50%' }}>
              <h2>Stopping execution on reject</h2>
              <RunTasks taskDefs={tasks} abortOnReject={true} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { UseTaskRunnerExample };
