import { useRef, useReducer, Reducer, useMemo, useEffect } from 'react';
import { AsyncState } from '../use-promise';

const clamp = (n: number, min: number, max: number): number => {
  return n < min ? min : n > max ? max : n;
};

interface TaskDefinition<R> {
  title: string;
  action: () => PromiseLike<R>;
}

interface Task<R> extends TaskDefinition<R> {
  id: string;
  state: AsyncState;
  returnValue?: R;
  error?: any;
}

interface TaskRunnerState<R> {
  tasks: Task<R>[];
  current: number;
  hasRejected: boolean;
}

enum TaskRunnerActions {
  SET_PENDING,
  SET_FULFILLED,
  SET_REJECTED,
}

type TaskRunnerAction<R> =
  | { type: TaskRunnerActions.SET_PENDING; payload: { task: Task<R> } }
  | {
      type: TaskRunnerActions.SET_FULFILLED;
      payload: { returnValue?: R; task: Task<R> };
    }
  | {
      type: TaskRunnerActions.SET_REJECTED;
      payload: { error: any; task: Task<R> };
    };

interface TaskRunnerOptions {
  abortOnReject?: boolean;
}

const reducer = <R>(
  state: TaskRunnerState<R>,
  action: TaskRunnerAction<R>,
): TaskRunnerState<R> => {
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
              returnValue: action.payload.returnValue,
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

const useTaskRunner = <R>(
  taskDefinitions: TaskDefinition<R>[],
  { abortOnReject }: TaskRunnerOptions = {},
): Task<R>[] => {
  const initialTasks = useMemo(() => prepareTasks(taskDefinitions), [
    taskDefinitions,
  ]);

  const [state, dispatch] = useReducer<
    Reducer<TaskRunnerState<R>, TaskRunnerAction<R>>
  >(reducer, {
    tasks: initialTasks,
    current: 0,
    hasRejected: false,
  });

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

    currentTask.action().then(
      returnValue => {
        dispatch({
          type: TaskRunnerActions.SET_FULFILLED,
          payload: { task: currentTask, returnValue },
        });
      },
      error => {
        dispatch({
          type: TaskRunnerActions.SET_REJECTED,
          payload: { task: currentTask, error },
        });
      },
    );
  }, [state, abortOnReject]);

  return state.tasks;
};

const generateId = (): string =>
  `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

const prepareTasks = <R>(taskDefinitions: TaskDefinition<R>[]): Task<R>[] => {
  return taskDefinitions.map(t => ({
    ...t,
    id: generateId(),
    state: AsyncState.initial,
  }));
};

export { useTaskRunner, AsyncState };
