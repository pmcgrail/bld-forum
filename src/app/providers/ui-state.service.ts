import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIStateService {
  selectedTab$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor() {}

  setSelectedTab(key: string) {
    this.selectedTab$.next(key);
  }
}
