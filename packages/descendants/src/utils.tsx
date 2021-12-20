import {
  createContext as _createContext,
  useContext as _useContext,
} from 'react';

interface CreateContextOptions {
  name: string;
  errorMessage: string;
}

export function createStrictContext<ContextType>({
  name,
  errorMessage,
}: CreateContextOptions) {
  let Context = _createContext<ContextType | undefined>(undefined);

  const Provider: React.FC<{ value: ContextType }> = ({ value, children }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  Provider.displayName = name;

  function useStrictContext() {
    let value = _useContext(Context);
    if (value === undefined) {
      throw new Error(errorMessage);
    }

    return value;
  }

  return [Provider, useStrictContext] as const;
}

export function createContext<ContextType>({
  name,
}: Omit<CreateContextOptions, 'errorMessage'>) {
  let Context = _createContext<ContextType | undefined>(undefined);

  const Provider: React.FC<{ value: ContextType }> = ({ value, children }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  Provider.displayName = name;

  function useContext() {
    return _useContext(Context);
  }

  return [Provider, useContext] as const;
}
