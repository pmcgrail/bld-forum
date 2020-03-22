import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUser>;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.fireStore.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.fireStore.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
