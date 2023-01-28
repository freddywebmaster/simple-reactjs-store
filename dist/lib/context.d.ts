import React from 'react';
export declare const RootContext: React.Context<any>;
interface Actions {
    [index: string]: <P>(state: Element, set?: (newData: Element) => void, payload?: P) => void;
}
export interface RootElement<Element> {
    name: string;
    initialState: Element;
    actions?: Actions;
}
export declare function SimpleRootStore<RootStore>(props: {
    children: JSX.Element;
    store: RootElement<RootStore>[];
}): JSX.Element;
export {};
