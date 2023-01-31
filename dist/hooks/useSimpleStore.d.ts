import { Slice } from '../lib/createSlice';
import { Store } from '../lib/store';
export interface FullSlice<T> {
    store: Store<T>;
    slice: Slice<T>;
}
interface Config<D> {
    onStoreChange: (data: D) => void;
}
export declare function useSimpleStore<T>(slice: FullSlice<T>, config?: Config<T>): {
    data: T;
    dispatch: <P>(action: import("../lib/store").Action<P>) => void;
    asyncDispatch: <R>(type: string, runner: (state: T) => Promise<R>) => Promise<void>;
    select: <K extends keyof T>(key: K) => import("rxjs").Observable<T[K]>;
};
export {};
