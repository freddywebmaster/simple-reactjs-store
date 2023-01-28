import { RootElement } from '../lib/context';
export declare function useSimpleState<T>(slice: RootElement<T>): {
    data: T;
    set: (newValue: T) => void;
    exec: <P>(action: (state: T, set: (newData: T) => void, payload?: P | undefined) => any, payload?: P | undefined) => void;
};
