"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSimpleStore = void 0;
/* eslint-disable react-hooks/exhaustive-deps */
const react_1 = require("react");
const context_1 = require("../lib/context");
const useLocalStorage_1 = __importDefault(require("./useLocalStorage"));
function useSimpleStore(slice, config) {
    var _a;
    const rootCtx = (0, react_1.useContext)(context_1.RootContext);
    const useCache = (_a = slice.slice.config) === null || _a === void 0 ? void 0 : _a.useLocalStorageCache;
    const [cache, setCache] = (0, useLocalStorage_1.default)(slice.slice.name, slice.slice.initialState);
    const [state, setState] = (0, react_1.useState)(slice.slice.initialState);
    (0, react_1.useEffect)(() => {
        const subs = slice.store.subscribe((data) => {
            if (config) {
                config.onStoreChange && config.onStoreChange(data);
            }
            if (useCache === true && rootCtx.mounted.includes(slice.slice.name)) {
                setCache(data);
            }
            if (!useCache) {
                setState(data);
            }
            try {
                rootCtx.root({
                    type: 'UPDATE_STORE',
                    payload: {
                        [slice.slice.name]: data,
                    },
                });
            }
            catch (error) {
                alert('SimpleReactStore: Plase set a GlobalProvider!');
            }
        });
        if (!rootCtx.mounted.includes(slice.slice.name)) {
            context_1.subjectMounted.emit(slice.slice.name);
        }
        return () => subs.unsubscribe();
    }, []);
    return {
        data: useCache ? cache : state,
        dispatch: slice.store.dispatch,
        asyncDispatch: slice.store.asyncDispatch,
        select: slice.store.select,
    };
}
exports.useSimpleStore = useSimpleStore;
