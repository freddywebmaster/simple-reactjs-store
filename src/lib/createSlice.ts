import { RootElement } from './context';

export function createSlice<T>(data: RootElement<T>) {
  return { ...data, actions: data.actions as any };
}