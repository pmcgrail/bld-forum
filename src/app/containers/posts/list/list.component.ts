import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../../providers';
import { IPost } from '../../../models';
import { MAX_POSTS } from 'src/app/data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  end: Date;
  finished = false;
  hasPosts = false;
  category: string;
  postsError = false;
  posts: Observable<IPost[]>[] = [];

  constructor(private route: ActivatedRoute, private service: PostService) {
    this.category = this.route.snapshot.params['category'];
  }

  loadMore() {
    this.posts = [
      ...this.posts,
      this.service
        .getPosts(this.category, this.end)
        .pipe(tap(this.onPostsLoaded), catchError(this.onPostsError)),
    ];
  }

  onPostsLoaded = (posts: IPost[]) => {
    const length = posts.length;
    this.hasPosts = this.hasPosts || !!length;
    if (!length || length < MAX_POSTS) {
      this.finished = true;
    } else {
      this.finished = false;
      this.end = posts[length - 1].lastActionDate;
    }
  };

  onPostsError = (error) => {
    console.error(error);
    this.postsError = true;
    return of([]);
  };

  ngOnInit() {
    this.posts = [
      this.service
        .getPosts(this.category)
        .pipe(tap(this.onPostsLoaded), catchError(this.onPostsError)),
    ];
  }
}
