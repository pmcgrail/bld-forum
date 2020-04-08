import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ICategory } from '../../models';
import { CategoryService } from 'src/app/providers/category.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  categoriesError = false;
  categories$: Observable<ICategory[]>;

  constructor(private service: CategoryService) {}

  onCategoriesError = (error) => {
    console.error(error);
    this.categoriesError = true;
    return of(undefined);
  };

  ngOnInit() {
    this.categories$ = this.service.categories$.pipe(
      catchError(this.onCategoriesError)
    );
  }
}
