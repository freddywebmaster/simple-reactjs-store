import { Action, Store } from "./store";
interface Config {
    useLocalStorageCache?: boolean;
}
export interface Slice<T> {
    name: string;
    initialState: T;
    config?: Config;
    reducer: (state: T, action: Action<any>) => T;
}
export declare function CreateSlice<T>(slice: Slice<T>): {
    store: Store<T>;
    slice: Slice<T>;
};
export {};
