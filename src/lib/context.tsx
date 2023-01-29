import React, { createContext, useState } from 'react';

export const RootContext = createContext<any>({});

export interface Actions<T> {
  [index: string]: (state: T, set: (data: T) => void | Promise<T>, payload?: any) => T;
}

export interface RootElement<SliceData> {
  name: string;
  initialState: SliceData;
  actions?: Actions<SliceData>;
}

export function SimpleRootStore(props: { children: JSX.Element; store: RootElement<any>[] }) {
  const initialState = () => {
    let final: any = {};
    props.store.map((el) => {
      final[el.name] = el.initialState;
    });
    return final;
  };

  const [state, dispatch] = useState(() => initialState());

  return (
    <RootContext.Provider
      value={{
        root: state,
        dispatch,
      }}
    >
      {props.children}
    </RootContext.Provider>
  );
}
