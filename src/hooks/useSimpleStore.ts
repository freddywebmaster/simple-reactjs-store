/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { RootContext, subjectMounted } from "../lib/context";
import { Slice } from "../lib/createSlice";
import { Store } from "../lib/store";
import useLocalStorage from "./useLocalStorage";

export interface FullSlice<T> {
  store: Store<T>;
  slice: Slice<T>;
}

interface Config<D> {
  onStoreChange: (data: D) => void;
}

export function useSimpleStore<T>(slice: FullSlice<T>, config?: Config<T>) {
  const rootCtx = useContext(RootContext);

  const useCache = slice.slice.config?.useLocalStorageCache;

  const [cache, setCache] = useLocalStorage(
    slice.slice.name,
    slice.slice.initialState
  );

  const [state, setState] = useState<T>(slice.slice.initialState);

  useEffect(() => {
    const subs = slice.store.subscribe((data) => {
      if (config) {
        config.onStoreChange && config.onStoreChange(data);
      }

      if (useCache === true && rootCtx.mounted.includes(slice.slice.name)) {
        setCache(data);
      }

      if (!useCache) {
        setState(data);
      }

      try {
        rootCtx.root({
          type: "UPDATE_STORE",
          payload: {
            [slice.slice.name]: data,
          },
        });
      } catch (error) {
        alert("SimpleReactStore: Plase set a GlobalProvider!");
      }
    });

    if (!rootCtx.mounted.includes(slice.slice.name)) {
      subjectMounted.emit(slice.slice.name);
    }

    return () => subs.unsubscribe();
  }, []);

  return {
    data: useCache ? (cache as T) : state,
    dispatch: slice.store.dispatch,
    asyncDispatch: slice.store.asyncDispatch,
  };
}
