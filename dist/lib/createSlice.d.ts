import { RootElement } from './context';
export declare function createSlice<T>(data: RootElement<T>): {
    actions: any;
    name: string;
    initialState: T;
};
