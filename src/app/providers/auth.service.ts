import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
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
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fireStore
            .doc<IUser>(`users/${user.uid}`)
            .valueChanges()
            .pipe(
              tap(() => {
                this.loading$.next(false);
              })
            );
        } else {
          return of(null);
        }
      })
    );
  }

  signinPopup(provider) {
    this.fireAuth.auth
      .signInWithPopup(provider)
      .then((credential) => this.updateUserData(credential.user));
  }

  signinRedirect(provider) {
    this.fireAuth.auth.signInWithRedirect(provider);
  }

  listenRedirect() {
    this.fireAuth.auth
      .getRedirectResult()
      .then((credential) => this.updateUserData(credential.user));
  }

  googleSignin() {
    this.signinRedirect(new auth.GoogleAuthProvider());
  }

  facebookSignin() {
    this.signinRedirect(new auth.FacebookAuthProvider());
  }

  private updateUserData(user) {
    if (user) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<IUser> = this.fireStore.doc(
        `users/${user.uid}`
      );

      const data = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      return userRef.set(data, { merge: true });
    }
  }

  async signOut() {
    await this.fireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
