import { Subject } from "rxjs";

export class SubjectManager {
  private subject$ = new Subject();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject<T>(value: T) {
    this.subject$.next(value);
  }
}

export const sharingInfo = new SubjectManager();
