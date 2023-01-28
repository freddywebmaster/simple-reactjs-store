"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield action(ctx.root[slice.name], setData, payload);
            setData(res);
        });
    }
    return {
        data: ctx.root[slice.name],
        set: setData,
        exec: execute,
    };
}
exports.useSimpleState = useSimpleState;
