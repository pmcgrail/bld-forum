import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIStateService {
  enableHeader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectedTab$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor() {}

  enableHeader() {
    this.enableHeader$.next(true);
  }

  setSelectedTab(key: string) {
    this.selectedTab$.next(key);
  }
}
