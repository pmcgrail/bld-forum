import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, catchError } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { IUser, IPost, IComment } from '../../../models';
import { PostService, CommentService, AuthService } from '../../../providers';
import { MAX_COMMENTS, COMMENT_MIN, COMMENT_MAX } from 'src/app/data';
import { ReportService } from 'src/app/providers/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  postError: string;
  post$: Observable<IPost>;

  commentsError = false;
  commentsLoading = false;
  comments$: Observable<IComment[]>;

  saveCommentError = false;
  saveCommentLoading = false;

  commentText = new FormControl('', [
    Validators.required,
    Validators.minLength(COMMENT_MIN),
    Validators.maxLength(COMMENT_MAX),
  ]);

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private service: PostService,
    private commentService: CommentService,
    private reportService: ReportService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.auth.user$.pipe(take(1)).subscribe((authUser: IUser) => {
      this.authId = authUser.uid;
    });
    this.postId = this.route.snapshot.params['postId'];
    this.category = this.route.snapshot.params['category'];
  }

  deletePost() {
    this.service
      .deletePost(this.postId)
      .then(this.onPostDeleteSuccess, this.onPostDeleteError);
  }

  onPostDeleteSuccess = () => {
    this.router.navigate([`posts/${this.category}`]);
  };

  onPostDeleteError = (error) => {
    console.error(error);
    this.postError = 'Error removing post';
  };

  reportPost() {
    this.reportService
      .reportPost(this.postId, this.authId)
      .then(this.onPostReportSuccess, this.onPostReportError);
  }

  onPostReportSuccess = () => {
    this.snackbar.open('Post reported', 'Dismiss', { duration: 2000 });
  };

  onPostReportError = (error) => {
    console.error(error);
    this.snackbar.open(
      'Error reporting post (did you already report it?)',
      'Dismiss',
      { duration: 2000 }
    );
  };

  onPostSuccess = (post: IPost) => {
    if (post) {
      this.pages = Math.ceil(post.commentCounter / MAX_COMMENTS);
    }
  };

  onPostError = (error) => {
    console.error(error);
    this.postError = 'Error loading post';
    return of(undefined);
  };

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
    this.onSaveComment();
    this.commentService
      .createComment(this.postId, data)
      .then(this.onSaveCommentSuccess, this.onSaveCommentError);
  }

  onSaveComment = () => {
    this.saveCommentLoading = true;
    this.saveCommentError = false;
  };

  onSaveCommentSuccess = () => {
    this.saveCommentLoading = false;
    this.commentText.reset();
  };

  onSaveCommentError = (error) => {
    console.error(error);
    this.saveCommentLoading = false;
    this.saveCommentError = true;
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
    this.post$ = this.service
      .getPost(this.postId)
      .pipe(tap(this.onPostSuccess), catchError(this.onPostError));
    this.onCommentsLoading();
    this.comments$ = this.commentService
      .getComments(this.postId)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }
}
