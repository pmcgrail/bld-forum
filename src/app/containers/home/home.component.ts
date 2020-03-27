import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/providers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authUser$;

  constructor(public auth: AuthService) {
    this.authUser$ = this.auth.user$;
  }

  loginFacebook() {
    this.auth.facebookSignin();
  }

  ngOnInit() {}
}
