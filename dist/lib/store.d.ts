import { Observable, Subscription } from "rxjs";
export interface Action<T> {
    type: string;
    payload?: T;
}
export declare class Store<T> {
    private _state;
    private _reducer;
    constructor(reducer: <P>(state: T, action: Action<P>) => T, initialState: T);
    select<K extends keyof T>(key: K): Observable<T[K]>;
    subscribe(callback: (state: T) => void): Subscription;
    dispatch: <P>(action: Action<P>) => void;
    asyncDispatch: <R>(type: string, runner: (state: T) => Promise<R>) => Promise<void>;
}
