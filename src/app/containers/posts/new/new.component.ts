import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PostService } from '../../../providers/post.service';
import { IUser } from '../../../models/user.interface';
import { AuthService } from '../../../providers/auth.service';
import { IPost } from '../../../models';

import {
  POST_TITLE_MIN,
  POST_TITLE_MAX,
  POST_TEXT_MIN,
  POST_TEXT_MAX,
} from 'src/app/data';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(POST_TITLE_MIN),
      Validators.maxLength(POST_TITLE_MAX),
    ]),
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(POST_TEXT_MIN),
      Validators.maxLength(POST_TEXT_MAX),
    ]),
  });

  userName: string;
  userId: string;
  destroy$: Subject<null> = new Subject();

  constructor(
    private router: Router,
    private auth: AuthService,
    private service: PostService
  ) {
    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe((user: IUser) => {
      this.userName = user.displayName;
      this.userId = user.uid;
    });
  }

  validateInput(formControlName: string) {
    const formControl = this.form.get(formControlName);
    return formControl.touched && formControl.dirty && formControl.errors;
  }

  getLengthError(formControlName: string) {
    const errors = this.form.get(formControlName).errors;
    const lengthError = errors.minlength || errors.maxlength;
    if (lengthError) {
      return `${lengthError.actualLength}/${lengthError.requiredLength}`;
    } else {
      return 'required';
    }
  }

  createPost() {
    const data: IPost = {
      ...this.form.value,
      userId: this.userId,
      createdDate: new Date(),
    };
    this.service.createPost(data).then(() => {
      this.router.navigate(['/posts']);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
