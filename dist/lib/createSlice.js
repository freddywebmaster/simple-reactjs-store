"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSlice = void 0;
const store_1 = require("./store");
function CreateSlice(slice) {
    var _a;
    const cache = JSON.parse(localStorage.getItem(slice.name));
    const store = new store_1.Store(slice.reducer, ((_a = slice.config) === null || _a === void 0 ? void 0 : _a.useLocalStorageCache) === true && cache
        ? cache
        : slice.initialState);
    return {
        store,
        slice,
    };
}
exports.CreateSlice = CreateSlice;
