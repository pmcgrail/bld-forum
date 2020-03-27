import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../providers/auth.service';
import { IUser } from 'src/app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  authUser$: Observable<IUser>;

  form = new FormGroup({
    district: new FormControl('', [Validators.required]),
    seClass: new FormControl('', [Validators.required]),
  });

  constructor(public auth: AuthService) {
    this.authUser$ = this.auth.user$;
  }

  logout() {
    this.auth.signOut();
  }

  saveUserInfo() {
    console.log(this.form.value);
  }

  ngOnInit() {}
}
