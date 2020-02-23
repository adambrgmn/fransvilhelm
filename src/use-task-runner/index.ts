import { useRef, useReducer, useMemo, useEffect } from 'react';
import { AsyncState } from '../shared';

const clamp = (n: number, min: number, max: number): number => {
  return n < min ? min : n > max ? max : n;
};

interface TaskDefinition {
  title: string;
  action: (arg?: any) => PromiseLike<any>;
}

interface Task extends TaskDefinition {
  id: string;
  state: AsyncState;
  value?: any;
  error?: any;
}

interface TaskRunnerState {
  tasks: Task[];
  current: number;
  hasRejected: boolean;
}

enum TaskRunnerActions {
  SET_PENDING,
  SET_FULFILLED,
  SET_REJECTED,
}

type TaskRunnerAction =
  | { type: TaskRunnerActions.SET_PENDING; payload: { task: Task } }
  | {
      type: TaskRunnerActions.SET_FULFILLED;
      payload: { value?: any; task: Task };
    }
  | {
      type: TaskRunnerActions.SET_REJECTED;
      payload: { error: any; task: Task };
    };

interface TaskRunnerOptions {
  abortOnReject?: boolean;
  onAllSettled?: (tasks: Task[]) => void;
  onFulfilled?: (task: Task) => void;
  onRejected?: (task: Task) => void;
}

const reducer = (
  state: TaskRunnerState,
  action: TaskRunnerAction,
): TaskRunnerState => {
  switch (action.type) {
    case TaskRunnerActions.SET_PENDING:
      return {
        ...state,
        tasks: state.tasks.map(t => {
          if (
            t.id === action.payload.task.id &&
            t.state !== AsyncState.pending
          ) {
            return {
              ...t,
              state: AsyncState.pending,
            };
          }

          return t;
        }),
      };

    case TaskRunnerActions.SET_FULFILLED:
      return {
        ...state,
        current: clamp(state.current + 1, 0, state.tasks.length - 1),
        tasks: state.tasks.map(t => {
          if (
            t.id === action.payload.task.id &&
            t.state !== AsyncState.fullfilled
          ) {
            return {
              ...t,
              state: AsyncState.fullfilled,
              value: action.payload.value,
            };
          }

          return t;
        }),
      };

    case TaskRunnerActions.SET_REJECTED:
      return {
        ...state,
        current: clamp(state.current + 1, 0, state.tasks.length - 1),
        hasRejected: true,
        tasks: state.tasks.map(t => {
          if (
            t.id === action.payload.task.id &&
            t.state !== AsyncState.rejected
          ) {
            return {
              ...t,
              state: AsyncState.rejected,
              error: action.payload.error,
            };
          }

          return t;
        }),
      };
    default:
      return state;
  }
};

const useTaskRunner = (
  taskDefinitions: TaskDefinition[],
  {
    abortOnReject,
    onAllSettled,
    onFulfilled,
    onRejected,
  }: TaskRunnerOptions = {},
): Task[] => {
  const initialTasks = useMemo(() => prepareTasks(taskDefinitions), [
    taskDefinitions,
  ]);

  const [state, dispatch] = useReducer(reducer, {
    tasks: initialTasks,
    current: 0,
    hasRejected: false,
  });

  const previousResultRef = useRef<any>();
  const currentActionRef = useRef<string>();

  useEffect(() => {
    const { tasks, current, hasRejected } = state;
    if (hasRejected && abortOnReject) return;

    const currentTask = tasks[current];

    if (currentTask.id === currentActionRef.current) return;
    currentActionRef.current = currentTask.id;

    dispatch({
      type: TaskRunnerActions.SET_PENDING,
      payload: { task: currentTask },
    });

    currentTask.action(previousResultRef.current).then(
      value => {
        previousResultRef.current = value;
        dispatch({
          type: TaskRunnerActions.SET_FULFILLED,
          payload: { task: currentTask, value },
        });

        if (onFulfilled) {
          currentTask.value = value;
          currentTask.state = AsyncState.fullfilled;
          onFulfilled(currentTask);
        }
      },
      error => {
        previousResultRef.current = error;
        dispatch({
          type: TaskRunnerActions.SET_REJECTED,
          payload: { task: currentTask, error },
        });

        if (onRejected) {
          currentTask.error = error;
          currentTask.state = AsyncState.rejected;
          onRejected(currentTask);
        }
      },
    );
  }, [state, abortOnReject, onFulfilled, onRejected]);

  useEffect(() => {
    const { tasks } = state;
    if (
      onAllSettled != null &&
      allPass(
        tasks,
        t => t.state !== AsyncState.initial && t.state !== AsyncState.pending,
      )
    ) {
      onAllSettled(tasks);
    }
  }, [state, onAllSettled]);

  return state.tasks;
};

const prepareTasks = (taskDefinitions: TaskDefinition[]): Task[] => {
  return taskDefinitions.map(t => ({
    ...t,
    id: generateId(),
    state: AsyncState.initial,
  }));
};

const generateId = (): string =>
  `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

const allPass = <I>(arr: I[], cond: (i: I) => boolean): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (!cond(arr[i])) return false;
  }

  return true;
};

export { useTaskRunner };
