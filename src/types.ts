export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type UseStateTuple<Value, SetValue = Value> = [
  Value,
  SetState<SetValue>,
];

export type InternalRefArg<T> = React.Ref<T> | undefined | null;
