import React, { createContext, useState } from 'react';

export const RootContext = createContext<any>({});

interface Actions {
  [index: string]: <P>(state: Element, set?: (newData: Element) => void, payload?: P) => void;
}

export interface RootElement<Element> {
  name: string;
  initialState: Element;
  actions?: Actions;
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
