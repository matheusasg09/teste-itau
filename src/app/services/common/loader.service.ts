import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private numberOfLoadersOpen$ = new BehaviorSubject<number>(0);

  loaderText$ = new BehaviorSubject<string>('');
  showLoader$ = this.numberOfLoadersOpen$.pipe(map((number) => number > 0));

  constructor() {}

  show(loaderText?: string): void {
    this.loaderText$.next(loaderText ?? '');
    this.numberOfLoadersOpen$.next(this.numberOfLoadersOpen$.getValue() + 1);
  }

  hide(): void {
    this.numberOfLoadersOpen$.next(this.numberOfLoadersOpen$.getValue() - 1);
    this.loaderText$.next('');
  }
}
