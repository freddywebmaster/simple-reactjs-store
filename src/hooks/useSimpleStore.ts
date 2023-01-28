/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';
import { RootContext, RootElement } from '../lib/context';

export function useSimpleState<T>(slice: RootElement<T>) {
  const ctx = useContext(RootContext);

  function setData(newValue: T) {
    ctx?.dispatch({ ...ctx.root, [slice.name]: newValue });
  }

  function execute<P>(action: (state: T, set: (newData: T) => void, payload?: P) => any, payload?: P) {
    action(ctx.root[slice.name], setData, payload);
  }

  return {
    data: ctx.root[slice.name] as T,
    set: setData,
    exec: execute,
  };
}
