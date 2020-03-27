import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { IUser, IPost, IComment } from '../../../models';
import { PostService, CommentService, AuthService } from '../../../providers';

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

  onSaveComment() {
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

  ngOnInit() {
    this.post$ = this.service.getPost(this.postId);
    this.comments$ = this.commentService.getComments(this.postId);
  }
}
