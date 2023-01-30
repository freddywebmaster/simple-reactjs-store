export declare class EventManager<T> {
    private subject$;
    receive(): import("rxjs").Observable<unknown>;
    emit(value: T): void;
}
