import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { IUser, IPostData, IComment } from '../../../models';

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
  post$: Observable<IPostData>;
  comments$: Observable<IComment[]>;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private service: PostService,
    private userService: UserService,
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
    this.post$ = this.service.getPost(this.postId).pipe(
      switchMap((post: IPostData) =>
        combineLatest(of(post), this.userService.getUser(post.userId))
      ),
      map(([post, user]: [IPostData, IUser]) => {
        return {
          ...post,
          userName: user.displayName,
        };
      })
    );
    this.comments$ = this.commentService.getComments(this.postId).pipe(
      switchMap((comments: IComment[]) => {
        const userIds = comments.reduce((ids, comment) => {
          if (!ids.includes(comment.userId)) {
            ids.push(comment.userId);
          }
          return ids;
        }, []);
        return combineLatest(of(comments), this.userService.getUsers(userIds));
      }),
      map(([comments, users]: [IComment[], IUser[]]) => {
        return comments.map((comment: IComment) => {
          return {
            ...comment,
            userName: users.find(user => user.uid === comment.userId)
              .displayName,
          };
        });
      })
    );
  }
}
