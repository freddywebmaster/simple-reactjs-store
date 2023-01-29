import { Slice } from '../lib/createSlice';
import { Store } from '../lib/store';
export interface FullSlice<T> {
    store: Store<T>;
    slice: Slice<T>;
}
export declare function useRoot<T>(slice: FullSlice<T>): {
    data: T;
    dispatch: <P>(action: import("../lib/store").Action<P>) => void;
};
