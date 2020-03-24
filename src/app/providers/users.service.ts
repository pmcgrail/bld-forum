import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private fireStore: AngularFirestore) {}

  getUser(userId: string): Observable<IUser> {
    return this.fireStore
      .collection('users')
      .doc<IUser>(userId)
      .valueChanges();
  }
}
