import React, { createContext, useState } from 'react';

export const RootContext = createContext<any>({});

export interface Actions<T> {
  [index: string]: <P>(state: T, set: (data: T) => T | Promise<T>, payload?: P) => void;
}

export interface RootElement<RE> {
  name: string;
  initialState: RE;
  actions?: Actions<RE>;
}

export function SimpleRootStore<RootStore>(props: { children: JSX.Element; store: RootElement<RootStore>[] }) {
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
