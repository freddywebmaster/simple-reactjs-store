/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';
import { RootContext, RootElement } from '../lib/context';

export function useSimpleState<T>(slice: RootElement<T>) {
  const ctx = useContext(RootContext);

  function setData(newValue: T) {
    ctx?.dispatch({ ...ctx.root, [slice.name]: newValue });
  }

  async function execute<P>(
    action: <P>(state: T, set: (newValue: T) => void, payload: P) => T | Promise<T>,
    payload?: P,
  ) {
    const res = await action(ctx.root[slice.name], setData, payload);
    setData(res);
  }

  return {
    data: ctx.root[slice.name] as T,
    set: setData,
    exec: execute,
  };
}
