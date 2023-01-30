import { Action, Store } from './store';

interface Config {
  useLocalStorageCache?: boolean;
}

export interface Slice<T> {
  name: string;
  initialState: T;
  config?: Config;
  reducer: (state: T, action: Action<any>) => T;
}

export function CreateSlice<T>(slice: Slice<T>) {
  const cache = () => {
    if (!localStorage) return;
    return JSON.parse(localStorage.getItem(slice.name) as string);
  };

  const store = new Store(
    slice.reducer,
    slice.config?.useLocalStorageCache === true && cache ? (cache() as T) : slice.initialState,
  );

  return {
    store,
    slice,
  };
}
