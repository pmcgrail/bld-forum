import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { IUser, IPost, IComment } from '../../../models';
import { PostService, CommentService, AuthService } from '../../../providers';
import { MAX_COMMENTS } from 'src/app/data';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  end: Date;
  start: Date;
  pages: number;
  authId: string;
  postId: string;
  loadingComments = false;
  post$: Observable<IPost>;
  comments$: Observable<IComment[]>;

  commentText = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(500),
  ]);

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

  loadPrevComments() {
    this.loadingComments = true;
    this.comments$ = this.commentService
      .getComments(this.postId, false, this.start)
      .pipe(tap(this.commentsLoaded));
  }

  loadNextComments() {
    this.loadingComments = true;
    this.comments$ = this.commentService
      .getComments(this.postId, true, this.end)
      .pipe(tap(this.commentsLoaded));
  }

  saveComment() {
    const data: IComment = {
      text: this.commentText.value,
      userId: this.authId,
      createdDate: new Date(),
    };
    this.commentService.createComment(this.postId, data).then(
      () => {
        this.commentText.reset();
      },
      error => {
        console.log(error);
      }
    );
  }

  commentsLoaded = (comments: IComment[]) => {
    this.loadingComments = false;
    this.start = comments[0].createdDate;
    this.end = comments[comments.length - 1].createdDate;
  };

  ngOnInit() {
    this.post$ = this.service
      .getPost(this.postId)
      .pipe(
        tap(
          (post: IPost) =>
            (this.pages = Math.ceil(post.commentCounter / MAX_COMMENTS))
        )
      );
    this.loadingComments = true;
    this.comments$ = this.commentService
      .getComments(this.postId)
      .pipe(tap(this.commentsLoaded));
  }
}
