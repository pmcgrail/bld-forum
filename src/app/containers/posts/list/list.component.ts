import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PostService } from '../../../providers';
import { IPost } from '../../../models';
import { MAX_POSTS } from 'src/app/data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  end: Date;
  finished = false;
  category: string;
  posts$: Observable<IPost[]>[];

  constructor(private route: ActivatedRoute, private service: PostService) {
    this.category = this.route.snapshot.params['category'];
  }

  loadMore() {
    this.posts$.push(
      this.service.getPosts(this.category, this.end).pipe(tap(this.postsLoaded))
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
    this.posts$ = [
      this.service.getPosts(this.category).pipe(tap(this.postsLoaded)),
    ];
  }
}
