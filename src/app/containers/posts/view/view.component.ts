import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, catchError } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { IUser, IPost, IComment } from '../../../models';
import { PostService, CommentService, AuthService } from '../../../providers';
import { MAX_COMMENTS, COMMENT_MIN, COMMENT_MAX } from 'src/app/data';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  authId: string;
  postId: string;
  category: string;

  end: Date;
  start: Date;
  pages: number;

  postError = false;
  post$: Observable<IPost>;

  commentsError = false;
  commentsLoading = false;
  comments$: Observable<IComment[]>;

  commentText = new FormControl('', [
    Validators.required,
    Validators.minLength(COMMENT_MIN),
    Validators.maxLength(COMMENT_MAX),
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
    this.category = this.route.snapshot.params['category'];
  }

  loadPrevComments() {
    this.onCommentsLoading();
    this.comments$ = this.commentService
      .getComments(this.postId, false, this.start)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }

  loadNextComments() {
    this.onCommentsLoading();
    this.comments$ = this.commentService
      .getComments(this.postId, true, this.end)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
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
      (error) => {
        console.log(error);
      }
    );
  }

  onPostError = (error) => {
    console.error(error);
    this.postError = true;
    return of(undefined);
  };

  onCommentsLoading = () => {
    this.commentsLoading = true;
    this.commentsError = false;
  };

  onCommentsLoaded = (comments: IComment[]) => {
    this.commentsLoading = false;
    this.commentsError = false;
    if (comments.length) {
      this.start = comments[0].createdDate;
      this.end = comments[comments.length - 1].createdDate;
    }
  };

  onCommentsError = (error) => {
    console.error(error);
    this.commentsLoading = false;
    this.commentsError = true;
    return of([]);
  };

  ngOnInit() {
    this.post$ = this.service.getPost(this.postId).pipe(
      tap(
        (post: IPost) =>
          (this.pages = Math.ceil(post.commentCounter / MAX_COMMENTS))
      ),
      catchError(this.onPostError)
    );
    this.onCommentsLoading();
    this.comments$ = this.commentService
      .getComments(this.postId)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }
}
