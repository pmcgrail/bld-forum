import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PostService } from '../../../providers/post.service';
import { IUser } from '../../../models/user.interface';
import { AuthService } from '../../../providers/auth.service';
import { IPost } from '../../../models';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000),
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
