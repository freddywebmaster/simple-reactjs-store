"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSimpleStore = exports.CreateSlice = exports.SimpleStateProvider = void 0;
var context_1 = require("./lib/context");
Object.defineProperty(exports, "SimpleStateProvider", { enumerable: true, get: function () { return context_1.SimpleStateProvider; } });
var createSlice_1 = require("./lib/createSlice");
Object.defineProperty(exports, "CreateSlice", { enumerable: true, get: function () { return createSlice_1.CreateSlice; } });
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "useSimpleStore", { enumerable: true, get: function () { return hooks_1.useSimpleStore; } });
