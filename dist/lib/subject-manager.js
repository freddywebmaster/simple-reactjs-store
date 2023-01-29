"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharingInfo = exports.SubjectManager = void 0;
const rxjs_1 = require("rxjs");
class SubjectManager {
    constructor() {
        this.subject$ = new rxjs_1.Subject();
    }
    getSubject() {
        return this.subject$.asObservable();
    }
    setSubject(value) {
        this.subject$.next(value);
    }
}
exports.SubjectManager = SubjectManager;
exports.sharingInfo = new SubjectManager();
