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

  constructor(private service: PostService, private userService: UserService) {}

  getUser(userId: string) {
    this.userService.getUser(userId);
  }

  ngOnInit() {
    this.posts$ = this.service.getPosts().pipe(
      filter(posts => !!posts),
      switchMap((posts: IPost[]) => {
        const userIds = posts.reduce((ids, post) => {
          if (!ids.includes(post.userId)) {
            ids.push(post.userId);
          }
          return ids;
        }, []);
        return combineLatest(of(posts), this.userService.getUsers(userIds));
      }),
      map(([posts, users]: [IPost[], IUser[]]) => {
        return posts.map((post: IPost) => {
          return {
            ...post,
            userName: users.find(user => user.uid === post.userId).displayName,
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
