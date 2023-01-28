import React from 'react';
export declare const RootContext: React.Context<any>;
export interface Actions<T> {
    [index: string]: <P>(state: T, set: (data: T) => T | Promise<T>, payload?: P) => void;
}
export interface RootElement<RE> {
    name: string;
    initialState: RE;
    actions?: Actions<RE>;
}
export declare function SimpleRootStore<RootStore>(props: {
    children: JSX.Element;
    store: RootElement<RootStore>[];
}): JSX.Element;
