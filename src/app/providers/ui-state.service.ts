import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UIStateService {
  enableHeader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectedTab$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor(private _snackbar: MatSnackBar) {}

  enableHeader() {
    this.enableHeader$.next(true);
  }

  setSelectedTab(key: string) {
    this.selectedTab$.next(key);
  }

  snackbar(message: string, duration = 3000) {
    this._snackbar.open(message, 'Dismiss', { duration });
  }
}
