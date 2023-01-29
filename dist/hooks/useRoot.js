"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoot = void 0;
const react_1 = require("react");
function useRoot(slice) {
    const [state, setState] = (0, react_1.useState)(slice.slice.initialState);
    (0, react_1.useEffect)(() => {
        const subs = slice.store.subscribe((data) => {
            setState(data);
        });
        return () => subs.unsubscribe();
    }, []);
    (0, react_1.useEffect)(() => { }, []);
    return { data: state, dispatch: slice.store.dispatch };
}
exports.useRoot = useRoot;
