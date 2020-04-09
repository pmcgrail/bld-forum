import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService, UIStateService } from 'src/app/providers';

const TABS = [
  {
    key: 'home',
    link: '',
    text: 'Home',
  },
  {
    key: 'posts',
    link: 'posts',
    text: 'Posts',
    private: true,
  },
  {
    key: 'profile',
    link: 'profile',
    text: 'Profile',
    private: true,
  },
  {
    key: 'about',
    link: 'about',
    text: 'About',
  },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  tabs = TABS;
  selectedTab$;
  enableHeader$;
  loggedIn = false;
  destroy$: Subject<null> = new Subject();

  constructor(private auth: AuthService, private uiState: UIStateService) {
    this.selectedTab$ = this.uiState.selectedTab$;
    this.enableHeader$ = this.uiState.enableHeader$;
  }

  ngOnInit() {
    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.loggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
