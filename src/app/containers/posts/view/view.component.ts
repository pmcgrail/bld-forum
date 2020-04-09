import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, catchError } from 'rxjs/operators';

import { IUser, IPost } from '../../../models';
import { PostService, AuthService, UIStateService } from '../../../providers';
import { MAX_COMMENTS } from 'src/app/data';
import { ReportService } from 'src/app/providers/report.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  pages: number;
  authId: string;
  postId: string;
  category: string;
  post$: Observable<IPost>;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private service: PostService,
    private reportService: ReportService,
    private router: Router,
    private uiService: UIStateService
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
    this.uiService.snackbar('Post deleted');
    this.router.navigate([`posts/${this.category}`]);
  };

  onPostDeleteError = (error) => {
    console.error(error);
    this.uiService.snackbar('Error deleting post');
  };

  reportPost() {
    this.reportService
      .reportPost(this.postId, this.authId)
      .then(this.onPostReportSuccess, this.onPostReportError);
  }

  onPostReportSuccess = () => {
    this.uiService.snackbar('Post reported');
  };

  onPostReportError = (error) => {
    console.error(error);
    this.uiService.snackbar(
      'Error reporting post (did you already report it?)'
    );
  };

  onPostSuccess = (post: IPost) => {
    if (post) {
      this.pages = Math.ceil(post.commentCounter / MAX_COMMENTS);
    }
  };

  onPostError = (error) => {
    console.error(error);
    this.uiService.snackbar('Error loading post');
    return of(undefined);
  };

  ngOnInit() {
    this.post$ = this.service
      .getPost(this.postId)
      .pipe(tap(this.onPostSuccess), catchError(this.onPostError));
  }
}
