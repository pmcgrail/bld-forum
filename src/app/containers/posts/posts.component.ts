import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, combineLatest, of } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';

import { PostService, UserService } from '../../providers';
import { IPost, IUser } from '../../models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts$;
  users$;
  destroy$: Subject<null> = new Subject();

  constructor(
    private service: PostService,
    private usersService: UserService
  ) {}

  getUser(userId: string) {
    this.usersService.getUser(userId);
  }

  ngOnInit() {
    this.posts$ = this.service.getPosts().pipe(
      filter(posts => !!posts),
      switchMap((posts: IPost[]) => {
        const userIds = posts.reduce((ids, post) => {
          if (!ids.includes(post.data.userId)) {
            ids.push(post.data.userId);
          }
          return ids;
        }, []);
        return combineLatest(
          of(posts),
          combineLatest(
            userIds.map(userId => this.usersService.getUser(userId))
          )
        );
      }),
      map(([posts, users]: [IPost[], IUser[]]) => {
        return posts.map((post: IPost) => {
          return {
            ...post,
            user: users.find(user => user.uid === post.data.userId),
          };
        });
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
