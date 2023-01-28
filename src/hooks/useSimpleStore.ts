/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { RootContext } from "../lib/context";

interface SimpleState<Element> {
  name: string;
  initialState: Element;
}

export function useSimpleState<T>(slice: SimpleState<T>) {
  const ctx = useContext(RootContext);

  function setData(newValue: T) {
    ctx?.dispatch({ ...ctx.root, [slice.name]: newValue });
  }

  return {
    data: ctx.root[slice.name] as T,
    set: setData,
  };
}
