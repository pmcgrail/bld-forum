import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { AuthService } from '../../providers/auth.service';
import { IUser } from 'src/app/models';
import { UserService } from 'src/app/providers';
import { DISTRICTS } from 'src/app/data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  authId: string;
  authUser$: Observable<IUser>;
  districts: string[] = DISTRICTS;

  userError = false;
  userLoading = false;

  form = new FormGroup({
    district: new FormControl('', [Validators.required]),
    seClass: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
    ]),
  });

  constructor(private auth: AuthService, private service: UserService) {
    this.authUser$ = this.auth.user$;
    this.authUser$.pipe(take(1)).subscribe((auth: IUser) => {
      this.authId = auth.uid;
      this.form.get('district').setValue(auth.district);
      this.form.get('seClass').setValue(auth.seClass);
    });
  }

  logout() {
    this.auth.signOut();
  }

  onSaveUserLoad = () => {
    this.userLoading = true;
    this.userError = false;
  };

  onSaveUserSuccess = () => {
    this.userLoading = false;
    this.form.markAsPristine();
  };

  onSaveUserError = () => {
    this.userLoading = false;
    this.userError = true;
  };

  saveUserInfo() {
    this.onSaveUserLoad();
    this.service
      .updateUser(this.authId, this.form.value)
      .then(this.onSaveUserSuccess, this.onSaveUserError);
  }

  ngOnInit() {}
}
