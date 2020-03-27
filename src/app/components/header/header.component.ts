import { Component, OnInit } from '@angular/core';
import { UIStateService } from 'src/app/providers/ui-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  TABS = [
    {
      key: 'home',
      link: '',
      text: 'Home',
    },
    {
      key: 'posts',
      link: 'posts',
      text: 'Posts',
    },
    {
      key: 'profile',
      link: 'profile',
      text: 'Profile',
    },
    {
      key: 'about',
      link: 'about',
      text: 'About',
    },
  ];

  selectedTab$;

  constructor(private uiState: UIStateService) {
    this.selectedTab$ = this.uiState.selectedTab$;
  }

  ngOnInit(): void {}
}
