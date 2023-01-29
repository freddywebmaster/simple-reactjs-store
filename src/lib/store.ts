import {
  BehaviorSubject,
  distinctUntilKeyChanged,
  Observable,
  pluck,
  Subscription,
} from "rxjs";

export interface Action<T> {
  type: string;
  payload?: T;
}

export class Store<T> {
  private _state: BehaviorSubject<T>;
  private _reducer: <P>(state: T, action: Action<P>) => T;
  constructor(reducer: <P>(state: T, action: Action<P>) => T, initialState: T) {
    this._state = new BehaviorSubject(initialState);
    this._reducer = reducer;
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state.pipe(distinctUntilKeyChanged(key), pluck(key));
  }

  subscribe(callback: (state: T) => void): Subscription {
    return this._state.subscribe(callback);
  }

  dispatch = <P>(action: Action<P>): void => {
    const oldState = this._state.getValue();
    const newState = this._reducer(oldState, action);
    this._state.next(newState);
  };

  asyncDispatch = async <R>(
    type: string,
    runner: (state: T) => Promise<R>
  ): Promise<void> => {
    const payload = await runner(this._state.getValue());
    this.dispatch({ type, payload });
  };
}
