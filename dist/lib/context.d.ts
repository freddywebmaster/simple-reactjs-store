import React from 'react';
export declare const RootContext: React.Context<any>;
export interface Actions<T> {
    [index: string]: (state: T, set: (data: T) => void | Promise<T>, payload?: any) => T;
}
export interface RootElement<SliceData> {
    name: string;
    initialState: SliceData;
    actions?: Actions<SliceData>;
}
export declare function SimpleRootStore(props: {
    children: JSX.Element;
    store: RootElement<any>[];
}): JSX.Element;
