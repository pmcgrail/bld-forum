import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { PostService, UserService, CommentService } from '../../../providers';
import { IUser, IPostData } from '../../../models';
import { IComment } from '../../../models/comment.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  post$: Observable<IPostData>;
  comments$: Observable<any>;
  postId: string;
  userId: string;
  userName: string;
  destroy$: Subject<null> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private service: PostService,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService
  ) {
    this.postId = this.route.snapshot.params['postId'];
  }

  onSaveComment(text: string) {
    const data: IComment = {
      text,
      userId: this.userId,
      createdDate: new Date(),
    };
    this.commentService.createComment(this.postId, data);
  }

  ngOnInit() {
    this.post$ = this.service.getPost(this.postId);
    this.comments$ = this.commentService.getComments(this.postId);
    this.post$
      .pipe(
        switchMap((post: IPostData) => {
          return this.userService.getUser(post.userId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((user: IUser) => {
        this.userId = user.uid;
        this.userName = user.displayName;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
