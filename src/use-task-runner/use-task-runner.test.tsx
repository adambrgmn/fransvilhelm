import * as React from 'react';
import { render, act } from '@testing-library/react';

import { useTaskRunner } from './';

const TaskList = ({ tasks }: any) => {
  return (
    <ul>
      {tasks.map((task: any) => (
        <li key={task.title}>
          <span data-testid="title">{task.title}:</span>{' '}
          <span data-testid="status">status {task.state}</span>{' '}
          {task.value !== null && (
            <span data-testid="data-resolved">
              {JSON.stringify(task.value)}
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

it('should serially run a set of tasks reporting the state of each of them', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: jest.fn(() => d.promise as PromiseLike<void>),
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
    action: jest.fn(() => d.promise as PromiseLike<void>),
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
    action: jest.fn(() => d.promise as PromiseLike<void>),
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
    action: jest.fn(() => d.promise as PromiseLike<void>),
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
    action: jest.fn(() => d.promise as PromiseLike<void>),
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

it('should pass the resolved/rejected value from the previous task into the next task', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: jest.fn(() => d.promise as PromiseLike<void>),
  }));

  const Test = () => <TaskList tasks={useTaskRunner(tasks)} />;
  const { queryAllByTestId } = render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];
    const currentTask = tasks[i];

    await act(async () => {
      deferred.resolve(`task ${i + 1}`);
      await deferred.promise;
    });

    if (i > 0) {
      expect(currentTask.action).toHaveBeenCalledWith(`task ${i}`);
    }
  }

  expect(queryAllByTestId('data-resolved')).toHaveLength(tasks.length);
});

const expectTask = expect.objectContaining({
  id: expect.any(String),
  title: expect.any(String),
});

it('should accept an onAllSettled-handler', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: jest.fn(() => d.promise as PromiseLike<void>),
  }));

  const onAllSettledHandler = jest.fn();

  const Test = () => (
    <TaskList
      tasks={useTaskRunner(tasks, { onAllSettled: onAllSettledHandler })}
    />
  );

  render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];

    await act(async () => {
      deferred.resolve(`task ${i + 1}`);
      await deferred.promise;
    });
  }

  expect(onAllSettledHandler).toHaveBeenCalledTimes(1);
  expect(onAllSettledHandler).toHaveBeenCalledWith(
    expect.arrayContaining([expectTask]),
  );
});

it('should accept an onFulfilled-handler', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: jest.fn(() => d.promise as PromiseLike<void>),
  }));

  const onFulfilledHandler = jest.fn();

  const Test = () => (
    <TaskList
      tasks={useTaskRunner(tasks, { onFulfilled: onFulfilledHandler })}
    />
  );

  render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];

    await act(async () => {
      deferred.resolve(`task ${i + 1}`);
      await deferred.promise;
    });
  }

  expect(onFulfilledHandler).toHaveBeenCalledTimes(tasks.length);
  expect(onFulfilledHandler).toHaveBeenCalledWith(expectTask);
});

it('should accept an onRejected-handler', async () => {
  const defers = Array.from(
    { length: 5 },
    () => new (window as any).Deferred(),
  );

  const tasks = defers.map((d, idx) => ({
    title: `task ${idx + 1}`,
    action: jest.fn(() => d.promise as PromiseLike<void>),
  }));

  const onRejectedHandler = jest.fn();

  const Test = () => (
    <TaskList tasks={useTaskRunner(tasks, { onRejected: onRejectedHandler })} />
  );

  render(<Test />);

  for (let i = 0; i < tasks.length; i++) {
    const deferred = defers[i];

    await act(async () => {
      try {
        deferred.reject(`task ${i + 1}`);
        await deferred.promise;
      } catch (err) {
        // void
      }
    });
  }

  expect(onRejectedHandler).toHaveBeenCalledTimes(tasks.length);
  expect(onRejectedHandler).toHaveBeenCalledWith(expectTask);
});
