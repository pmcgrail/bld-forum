import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
    linkType: new FormControl(0, []),
    url: new FormControl('', []),
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(POST_TEXT_MIN),
      Validators.maxLength(POST_TEXT_MAX),
    ]),
  });

  userId: string;
  category: string;
  userName: string;
  destroy$: Subject<null> = new Subject();

  constructor(
    private router: Router,
    private auth: AuthService,
    private service: PostService,
    private route: ActivatedRoute
  ) {
    this.category = this.route.snapshot.params['category'];
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
    const url = this.form.get('url').value;
    const data: IPost = {
      ...this.form.value,
      userId: this.userId,
      category: this.category,
      createdDate: new Date(),
      linkType: Number(this.form.get('linkType').value),
      url: url ? `http://${url}` : null,
    };
    this.service.createPost(data).then(() => {
      this.router.navigate([`/posts/${this.category}`]);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
