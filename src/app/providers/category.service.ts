import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ICategory } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories$: Observable<ICategory[]>;

  constructor(private fireStore: AngularFirestore) {
    this.categories$ = this.fireStore
      .collection<ICategory>('categories', ref => ref.orderBy('order', 'asc'))
      .valueChanges();
  }
}
