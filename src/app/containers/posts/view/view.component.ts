import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PostsService, UsersService } from '../../../providers';
import { IUser, IPostData } from '../../../models';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  post$: Observable<IPostData>;
  user$: Observable<IUser>;
  postId: string;
  constructor(
    private route: ActivatedRoute,
    private service: PostsService,
    private usersService: UsersService
  ) {
    this.postId = this.route.snapshot.params['postId'];
  }

  ngOnInit() {
    this.post$ = this.service.getPost(this.postId);
    this.user$ = this.post$.pipe(
      switchMap((post: IPostData) => {
        return this.usersService.getUser(post.userId);
      }),
      map((user: IUser) => user)
    );
  }
}
