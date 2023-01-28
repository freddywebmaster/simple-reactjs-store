"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSimpleState = exports.createSlice = exports.SimpleRootStore = void 0;
var context_1 = require("./lib/context");
Object.defineProperty(exports, "SimpleRootStore", { enumerable: true, get: function () { return context_1.SimpleRootStore; } });
var createSlice_1 = require("./lib/createSlice");
Object.defineProperty(exports, "createSlice", { enumerable: true, get: function () { return createSlice_1.createSlice; } });
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "useSimpleState", { enumerable: true, get: function () { return hooks_1.useSimpleState; } });
