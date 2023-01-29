"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleStateProvider = exports.RootContext = exports.subjectMounted = void 0;
const react_1 = __importStar(require("react"));
const createSlice_1 = require("./createSlice");
const useRoot_1 = require("../hooks/useRoot");
const subject_manager_1 = require("./subject-manager");
const rootSlice = (0, createSlice_1.CreateSlice)({
    name: 'Root',
    initialState: {},
    reducer(state, action) {
        switch (action.type) {
            case 'INIT_LOAD_STATES':
                return action.payload;
            case 'UPDATE_STORE':
                return Object.assign(Object.assign({}, state), action.payload);
            default:
                return state;
        }
    },
});
exports.subjectMounted = new subject_manager_1.SubjectManager();
exports.RootContext = (0, react_1.createContext)({
    root: {},
    store: {},
    mounted: [],
});
function SimpleStateProvider(props) {
    const { data, dispatch } = (0, useRoot_1.useRoot)(rootSlice);
    const [mounted, setMounted] = (0, react_1.useState)([]);
    const generateInitialState = () => {
        let stateResult = {};
        props.store.map((stateElement) => {
            var _a;
            const useCache = (_a = stateElement.slice.config) === null || _a === void 0 ? void 0 : _a.useLocalStorageCache;
            stateResult[stateElement.slice.name] = useCache
                ? JSON.parse(localStorage.getItem(stateElement.slice.name) || '')
                : stateElement.slice.initialState;
        });
        dispatch({ type: 'INIT_LOAD_STATES', payload: stateResult });
    };
    const mountSubject = exports.subjectMounted.getSubject();
    (0, react_1.useEffect)(() => {
        exports.RootContext.displayName = 'SIMPLE_REACT_STORE';
        generateInitialState();
        mountSubject.subscribe((data) => {
            if (mounted.includes(data))
                return;
            setMounted([...mounted, data]);
        });
    }, []);
    return (react_1.default.createElement(exports.RootContext.Provider, { value: {
            root: dispatch,
            store: data,
            mounted,
        } }, props.children));
}
exports.SimpleStateProvider = SimpleStateProvider;
