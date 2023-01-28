import React from 'react';
export declare const RootContext: React.Context<any>;
interface RootElement<Element> {
    name: string;
    initialState: Element;
}
export declare function SimpleRootStore<RootStore>(props: {
    children: JSX.Element;
    store: RootElement<RootStore>[];
}): JSX.Element;
export {};
