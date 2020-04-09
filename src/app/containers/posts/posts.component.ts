import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ICategory } from '../../models';
import { CategoryService, UIStateService } from 'src/app/providers';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  categories$: Observable<ICategory[]>;

  constructor(
    private service: CategoryService,
    private uiService: UIStateService
  ) {}

  onCategoriesError = (error) => {
    console.error(error);
    this.uiService.snackbar('Error loading categories');
    return of(undefined);
  };

  ngOnInit() {
    this.categories$ = this.service.categories$.pipe(
      catchError(this.onCategoriesError)
    );
  }
}
