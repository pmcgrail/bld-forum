import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/providers';
import { IUser } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authUser$: Observable<IUser>;
  loading$: Observable<boolean>;

  constructor(public auth: AuthService) {
    this.auth.listenRedirect();
    this.authUser$ = this.auth.user$;
    this.loading$ = this.auth.loading$;
  }

  loginFacebook() {
    this.auth.facebookSignin();
  }

  ngOnInit() {}
}
