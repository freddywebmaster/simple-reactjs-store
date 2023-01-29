export declare class SubjectManager {
    private subject$;
    getSubject(): import("rxjs").Observable<unknown>;
    setSubject<T>(value: T): void;
}
export declare const sharingInfo: SubjectManager;
