import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, act } from 'react-testing-library';
import { useTaskRunner } from './';

const TaskList = ({ tasks }: any) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.title}>
          <span data-testid="title">{task.title}:</span>{' '}
          <span data-testid="status">status {task.state}</span>{' '}
          {task.returnValue !== null && (
            <span data-testid="data-resolved">
              {JSON.stringify(task.returnValue)}
            </span>
          )}
          {task.error != null && (
            <span data-testid="data-rejected">{task.error.message}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

it.only('should serially run a set of tasks reporting the state of each of them', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: () => d.promise as PromiseLike<void>,
  }));

  const Test = () => <TaskList tasks={useTaskRunner(tasks)} />;
  const { queryAllByText } = render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];

    await act(async () => {
      deferred.resolve(`task ${i + 1}`);
      await deferred.promise;
    });

    expect(queryAllByText(/fullfilled/i)).toHaveLength(i + 1);
  }
});

it('should ignore errors by default and keep running', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: () => d.promise as PromiseLike<void>,
  }));

  const Test = () => <TaskList tasks={useTaskRunner(tasks)} />;
  const { queryAllByText } = render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];

    if (i === 2) {
      await act(async () => {
        try {
          deferred.reject(new Error(`task ${i + 1}`));
          await deferred.promise;
        } catch (err) {
          // void
        }
      });
    } else {
      await act(async () => {
        deferred.resolve(`task ${i + 1}`);
        await deferred.promise;
      });
    }
  }

  expect(queryAllByText(/rejected/i)).toHaveLength(1);
  expect(queryAllByText(/fullfilled/i)).toHaveLength(4);
});

it('should abort on first error if abortOnReject is true', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: () => d.promise as PromiseLike<void>,
  }));

  const Test = () => (
    <TaskList tasks={useTaskRunner(tasks, { abortOnReject: true })} />
  );
  const { queryAllByText } = render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];

    if (i === 2) {
      await act(async () => {
        try {
          deferred.reject(new Error(`task ${i + 1}`));
          await deferred.promise;
        } catch (err) {
          // void
        }
      });
    } else {
      await act(async () => {
        deferred.resolve(`task ${i + 1}`);
        await deferred.promise;
      });
    }
  }

  expect(queryAllByText(/fullfilled/i)).toHaveLength(2);
  expect(queryAllByText(/rejected/i)).toHaveLength(1);
  expect(queryAllByText(/initial/i)).toHaveLength(2);
});

it('should report the resolved value for each task', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: () => d.promise as PromiseLike<void>,
  }));

  const Test = () => <TaskList tasks={useTaskRunner(tasks)} />;
  const { queryAllByTestId } = render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];

    await act(async () => {
      deferred.resolve(`task ${i + 1}`);
      await deferred.promise;
    });
  }

  expect(queryAllByTestId('data-resolved')).toHaveLength(tasks.length);
});

it('should report the rejected value for each task', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: () => d.promise as PromiseLike<void>,
  }));

  const Test = () => <TaskList tasks={useTaskRunner(tasks)} />;
  const { queryAllByTestId } = render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];

    await act(async () => {
      try {
        deferred.reject(new Error(`task ${i + 1}`));
        await deferred.promise;
      } catch (err) {
        // void
      }
    });
  }

  expect(queryAllByTestId('data-rejected')).toHaveLength(tasks.length);
});
