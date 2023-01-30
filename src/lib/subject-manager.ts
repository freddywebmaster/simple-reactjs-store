import { Subject } from 'rxjs';

export class EventManager<T> {
  private subject$ = new Subject();

  receive() {
    return this.subject$.asObservable();
  }

  emit(value: T) {
    this.subject$.next(value);
  }
}
