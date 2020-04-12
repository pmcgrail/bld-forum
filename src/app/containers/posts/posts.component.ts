import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ICategory, IPost } from '../../models';
import {
  CategoryService,
  UIStateService,
  PostService,
} from 'src/app/providers';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  latestPosts$: Observable<IPost[]>;
  categories$: Observable<ICategory[]>;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private uiService: UIStateService
  ) {}

  getCommentCount(post: IPost) {
    return post.commentCounter ? ` (${post.commentCounter})` : '';
  }

  getPostCount(category: ICategory) {
    return ` (${category.postCounter ? category.postCounter : 0})`;
  }

  onLatestPostsError = error => {
    console.error(error);
    this.uiService.snackbar('Error loading latest posts');
    return of(undefined);
  };

  onCategoriesError = error => {
    console.error(error);
    this.uiService.snackbar('Error loading categories');
    return of(undefined);
  };

  ngOnInit() {
    this.latestPosts$ = this.postService
      .getLatestPosts()
      .pipe(catchError(this.onLatestPostsError));
    this.categories$ = this.categoryService.categories$.pipe(
      catchError(this.onCategoriesError)
    );
  }
}
