import { useEffect, useState } from 'react';
import { Slice } from '../lib/createSlice';
import { Store } from '../lib/store';

export interface FullSlice<T> {
  store: Store<T>;
  slice: Slice<T>;
}

export function useRoot<T>(slice: FullSlice<T>) {
  const [state, setState] = useState<T>(slice.slice.initialState);

  useEffect(() => {
    const subs = slice.store.subscribe((data) => {
      setState(data);
    });

    return () => subs.unsubscribe();
  }, []);

  useEffect(() => {}, []);

  return { data: state, dispatch: slice.store.dispatch };
}
