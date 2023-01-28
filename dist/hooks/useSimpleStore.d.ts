import { RootElement } from '../lib/context';
export declare function useSimpleState<T>(slice: RootElement<T>): {
    data: T;
    set: (newValue: T) => void;
    exec: <P>(action: <P_1>(state: T, set: (newValue: T) => void, payload: P_1) => T | Promise<T>, payload?: P | undefined) => Promise<void>;
};
