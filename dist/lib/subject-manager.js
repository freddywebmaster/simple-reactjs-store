"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const rxjs_1 = require("rxjs");
class EventManager {
    constructor() {
        this.subject$ = new rxjs_1.Subject();
    }
    receive() {
        return this.subject$.asObservable();
    }
    emit(value) {
        this.subject$.next(value);
    }
}
exports.EventManager = EventManager;
