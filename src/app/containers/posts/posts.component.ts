import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PostService } from '../../providers';
import { IPost } from '../../models';
import { MAX_POSTS } from 'src/app/data';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  users$;
  end: Date;
  finished = false;
  posts$: Observable<IPost[]>[];
  destroy$: Subject<null> = new Subject();

  constructor(private service: PostService) {}

  loadMore() {
    this.posts$.push(
      this.service.getPosts(this.end).pipe(tap(this.postsLoaded))
    );
  }

  postsLoaded = (posts: IPost[]) => {
    const length = posts.length;
    if (!length || length < MAX_POSTS) {
      this.finished = true;
    } else {
      this.end = posts[length - 1].lastActionDate;
    }
  };

  ngOnInit() {
    this.posts$ = [this.service.getPosts().pipe(tap(this.postsLoaded))];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
