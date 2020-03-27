import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IUser, IPost, IComment } from '../../../models';

import {
  PostService,
  UserService,
  CommentService,
  AuthService,
} from '../../../providers';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  authId: string;
  postId: string;
  post$: Observable<IPost>;
  comments$: Observable<IComment[]>;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private service: PostService,
    private commentService: CommentService
  ) {
    this.auth.user$.pipe(take(1)).subscribe((authUser: IUser) => {
      this.authId = authUser.uid;
    });
    this.postId = this.route.snapshot.params['postId'];
  }

  onSaveComment(text: string) {
    const data: IComment = {
      text,
      userId: this.authId,
      createdDate: new Date(),
    };
    this.commentService.createComment(this.postId, data);
  }

  ngOnInit() {
    this.post$ = this.service.getPost(this.postId);
    this.comments$ = this.commentService.getComments(this.postId);
  }
}
