import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { UIStateService } from './ui-state.service';

@Injectable({ providedIn: 'root' })
export class NavResolver implements Resolve<boolean> {
  constructor(private uiState: UIStateService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let selectedTab;
    if (route.url[0]) {
      const path = route.url[0].path;
      selectedTab =
        path === 'posts' ? 'posts' : path === 'profile' ? 'profile' : undefined;
    } else {
      selectedTab = 'home';
    }
    this.uiState.setSelectedTab(selectedTab);
    return true;
  }
}
