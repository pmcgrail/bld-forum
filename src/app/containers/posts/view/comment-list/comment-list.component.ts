import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IComment } from 'src/app/models';
import { CommentService, ReportService } from 'src/app/providers';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() pages: number;
  @Input() authId: string;
  @Input() postId: string;

  end: Date;
  start: Date;

  commentsError = false;
  commentsLoading = false;
  comments$: Observable<IComment[]>;

  constructor(
    private service: CommentService,
    private reportService: ReportService,
    private snackbar: MatSnackBar
  ) {}

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

  loadPrevComments() {
    this.onCommentsLoading();
    this.comments$ = this.service
      .getComments(this.postId, false, this.start)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }

  loadNextComments() {
    this.onCommentsLoading();
    this.comments$ = this.service
      .getComments(this.postId, true, this.end)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }

  deleteComment(commentId) {
    this.service
      .deleteComment(this.postId, commentId)
      .then(this.onCommentDeleteSuccess, this.onCommentDeleteError);
  }

  onCommentDeleteSuccess = () => {};

  onCommentDeleteError = (error) => {
    console.error(error);
  };

  reportComment(commentId) {
    this.reportService
      .reportComment(commentId, this.authId)
      .then(this.onCommentReportSuccess, this.onCommentReportError);
  }

  onCommentReportSuccess = () => {
    this.snackbar.open('Comment reported', 'Dismiss', { duration: 2000 });
  };

  onCommentReportError = (error) => {
    console.error(error);
    this.snackbar.open(
      'Error reporting comment (did you already report it?)',
      'Dismiss',
      { duration: 2000 }
    );
  };

  ngOnInit() {
    this.onCommentsLoading();
    this.comments$ = this.service
      .getComments(this.postId)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }
}
