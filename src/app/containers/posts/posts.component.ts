import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ICategory } from '../../models';
import { CategoryService } from 'src/app/providers/category.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  categories$: Observable<ICategory[]>;

  constructor(private service: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.service.categories$;
  }
}
