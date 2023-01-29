import { useContext, useEffect, useState } from 'react';
import { RootContext, subjectMounted } from '../lib/context';
import { Slice } from '../lib/createSlice';
import { Store } from '../lib/store';
import useLocalStorage from './useLocalStorage';

export interface FullSlice<T> {
  store: Store<T>;
  slice: Slice<T>;
}

export function useSimpleStore<T>(slice: FullSlice<T>) {
  const rootCtx = useContext(RootContext);

  const useCache = slice.slice.config?.useLocalStorageCache;

  const [cache, setCache] = useLocalStorage(slice.slice.name, slice.slice.initialState);

  const [state, setState] = useState<T>(slice.slice.initialState);

  useEffect(() => {
    const subs = slice.store.subscribe((data) => {
      if (useCache === true && rootCtx.mounted.includes(slice.slice.name)) {
        setCache(data);
      }

      if (!useCache) {
        setState(data);
      }

      rootCtx.root({
        type: 'UPDATE_STORE',
        payload: {
          [slice.slice.name]: data,
        },
      });
    });

    if (!rootCtx.mounted.includes(slice.slice.name)) {
      subjectMounted.setSubject(slice.slice.name);
    }

    return () => subs.unsubscribe();
  }, []);

  return {
    data: useCache ? (cache as T) : state,
    dispatch: slice.store.dispatch,
  };
}
