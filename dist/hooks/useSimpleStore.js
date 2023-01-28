"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSimpleState = void 0;
/* eslint-disable react-hooks/exhaustive-deps */
const react_1 = require("react");
const context_1 = require("../lib/context");
function useSimpleState(slice) {
    const ctx = (0, react_1.useContext)(context_1.RootContext);
    function setData(newValue) {
        ctx === null || ctx === void 0 ? void 0 : ctx.dispatch(Object.assign(Object.assign({}, ctx.root), { [slice.name]: newValue }));
    }
    function execute(action, payload) {
        action(ctx.root[slice.name], setData, payload);
    }
    return {
        data: ctx.root[slice.name],
        set: setData,
        exec: execute,
    };
}
exports.useSimpleState = useSimpleState;
