import React, { createContext, useEffect, useState } from 'react';
import { CreateSlice } from './createSlice';
import { useRoot } from '../hooks/useRoot';
import { FullSlice } from '../hooks/useSimpleStore';
import { EventManager } from './subject-manager';

const rootSlice = CreateSlice({
  name: 'Root',
  initialState: {} as any,
  reducer(state, action) {
    switch (action.type) {
      case 'INIT_LOAD_STATES':
        return action.payload;
      case 'UPDATE_STORE':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
});

export const subjectMounted = new EventManager();

export const RootContext = createContext({
  root: {} as any,
  store: {} as any,
  mounted: [] as string[],
});

export function SimpleStateProvider(props: { children: JSX.Element; store: FullSlice<any>[] }) {
  const { data, dispatch } = useRoot(rootSlice);

  const [mounted, setMounted] = useState<string[]>([]);

  const generateInitialState = () => {
    let stateResult: any = {};

    props.store.map((stateElement) => {
      const useCache = stateElement.slice.config?.useLocalStorageCache;

      stateResult[stateElement.slice.name] = useCache
        ? JSON.parse(localStorage.getItem(stateElement.slice.name) || '')
        : stateElement.slice.initialState;
    });

    dispatch({ type: 'INIT_LOAD_STATES', payload: stateResult });
  };

  const mountSubject = subjectMounted.receive();

  useEffect(() => {
    RootContext.displayName = 'SIMPLE_REACT_STORE';
    generateInitialState();

    mountSubject.subscribe((data) => {
      if (mounted.includes(data as string)) return;

      setMounted([...mounted, data as string]);
    });
  }, []);

  return (
    <RootContext.Provider
      value={{
        root: dispatch,
        store: data,
        mounted,
      }}
    >
      {props.children}
    </RootContext.Provider>
  );
}
