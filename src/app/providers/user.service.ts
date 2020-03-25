import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fireStore: AngularFirestore) {}

  getUser(userId: string): Observable<IUser> {
    return this.fireStore
      .collection('users')
      .doc<IUser>(userId)
      .get()
      .pipe(map((doc: DocumentSnapshot<IUser>) => doc.data()));
  }

  getUsers(userIds: string[]): Observable<any> {
    return this.fireStore
      .collection<IUser>('users', ref => ref.where('uid', 'in', userIds))
      .get()
      .pipe(map(collection => collection.docs.map(doc => doc.data)));
  }
}
