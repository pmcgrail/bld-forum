import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PostsService } from '../../../providers/posts.service';
import { IUser } from '../../../models/user.interface';
import { AuthService } from '../../../providers/auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  userName: string;
  userId: string;
  destroy$: Subject<null> = new Subject();

  constructor(private auth: AuthService, private service: PostsService) {
    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe((user: IUser) => {
      this.userName = user.displayName;
      this.userId = user.uid;
    });
  }

  createPost() {
    const data = {
      ...this.form.value,
      userId: this.userId,
    };
    this.service.createPost(data);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
