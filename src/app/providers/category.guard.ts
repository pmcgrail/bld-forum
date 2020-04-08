import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryService } from './category.service';
import { ICategory } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryGuard implements CanActivate {
  constructor(private service: CategoryService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const { category } = next.params;
    return this.service.categories$.pipe(
      map((categories: ICategory[]) => {
        const valid = categories
          .map((category) => category.name)
          .includes(category);
        if (!valid) {
          this.router.navigate(['posts']);
        }
        return valid;
      })
    );
  }
}
