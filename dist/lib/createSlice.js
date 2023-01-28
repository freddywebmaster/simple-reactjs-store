"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlice = void 0;
function createSlice(data) {
    return Object.assign(Object.assign({}, data), { actions: data.actions });
}
exports.createSlice = createSlice;
