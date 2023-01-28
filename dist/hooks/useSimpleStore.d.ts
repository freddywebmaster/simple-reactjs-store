interface SimpleState<Element> {
    name: string;
    initialState: Element;
}
export declare function useSimpleState<T>(slice: SimpleState<T>): {
    data: T;
    set: (newValue: T) => void;
};
export {};
