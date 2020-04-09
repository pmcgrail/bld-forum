import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IComment } from 'src/app/models';
import {
  CommentService,
  ReportService,
  UIStateService,
} from 'src/app/providers';

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
  comments$: Observable<IComment[]>;

  constructor(
    private service: CommentService,
    private reportService: ReportService,
    private uiService: UIStateService
  ) {}

  loadPrevComments() {
    this.comments$ = this.service
      .getComments(this.postId, false, this.start)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }

  loadNextComments() {
    this.comments$ = this.service
      .getComments(this.postId, true, this.end)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }

  onCommentsLoaded = (comments: IComment[]) => {
    if (comments.length) {
      this.start = comments[0].createdDate;
      this.end = comments[comments.length - 1].createdDate;
    }
  };

  onCommentsError = (error) => {
    console.error(error);
    this.uiService.snackbar('Error loading comments');
    return of(undefined);
  };

  deleteComment(commentId) {
    this.service
      .deleteComment(this.postId, commentId)
      .then(this.onCommentDeleteSuccess, this.onCommentDeleteError);
  }

  onCommentDeleteSuccess = () => {
    this.uiService.snackbar('Comment deleted');
  };

  onCommentDeleteError = (error) => {
    console.error(error);
    this.uiService.snackbar('Error deleting comment');
  };

  reportComment(commentId) {
    this.reportService
      .reportComment(commentId, this.authId)
      .then(this.onCommentReportSuccess, this.onCommentReportError);
  }

  onCommentReportSuccess = () => {
    this.uiService.snackbar('Comment reported');
  };

  onCommentReportError = (error) => {
    console.error(error);
    this.uiService.snackbar(
      'Error reporting comment (did you already report it?)'
    );
  };

  ngOnInit() {
    this.comments$ = this.service
      .getComments(this.postId)
      .pipe(tap(this.onCommentsLoaded), catchError(this.onCommentsError));
  }
}
