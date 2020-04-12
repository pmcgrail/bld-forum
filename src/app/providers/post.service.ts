import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import {
  AngularFirestore,
  CollectionReference,
  DocumentChangeAction,
} from '@angular/fire/firestore';

import { IPost } from '../models';
import { MAX_POSTS, MAX_DATE } from '../data';

const mapSortDates = (posts: DocumentChangeAction<any>[]) => {
  return posts
    .map((post: DocumentChangeAction<any>) => {
      const data = post.payload.doc.data();
      const createdDate = data.createdDate.toDate();
      const lastActionDate = data.lastActionDate.toDate();
      return {
        ...data,
        createdDate,
        lastActionDate,
        uid: post.payload.doc.id,
      };
    })
    .sort((a, b) => b.lastActionDate - a.lastActionDate);
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private fireStore: AngularFirestore) {}

  getPosts(category: string, from?: Date): Observable<IPost[]> {
    const pagedQuery = (ref: CollectionReference) => {
      return ref
        .where('category', '==', category)
        .orderBy('lastActionDate', 'desc')
        .startAfter(from ? from : MAX_DATE)
        .limit(MAX_POSTS);
    };

    return this.fireStore
      .collection('posts', pagedQuery)
      .snapshotChanges()
      .pipe(map(mapSortDates));
  }

  getLatestPosts(): Observable<IPost[]> {
    return this.fireStore
      .collection('posts', ref => ref.orderBy('createdDate', 'desc').limit(5))
      .snapshotChanges()
      .pipe(map(mapSortDates));
  }

  getLatestActivity(): Observable<IPost[]> {
    return this.fireStore
      .collection('posts', ref =>
        ref.orderBy('lastActionDate', 'desc').limit(5)
      )
      .snapshotChanges()
      .pipe(map(mapSortDates));
  }

  getPost(postId: string): Observable<IPost> {
    return this.fireStore
      .collection('posts')
      .doc<IPost>(postId)
      .valueChanges()
      .pipe(
        map((post: any) => {
          if (post) {
            const createdDate = post.createdDate.toDate();
            return {
              ...post,
              createdDate,
            };
          }
        })
      );
  }

  createPost(post: IPost) {
    const updateCategory = () => {
      this.fireStore
        .collection('categories')
        .doc(post.category)
        .set(
          {
            postCounter: firebase.firestore.FieldValue.increment(1),
          },
          { merge: true }
        );
    };

    const data = {
      ...post,
      lastActionDate: post.createdDate,
    };
    return this.fireStore
      .collection('posts')
      .add(data)
      .then(updateCategory);
  }

  deletePost(postId: string, category: string) {
    const updateCategory = () => {
      this.fireStore
        .collection('categories')
        .doc(category)
        .set(
          {
            postCounter: firebase.firestore.FieldValue.increment(-1),
          },
          { merge: true }
        );
    };

    return this.fireStore
      .collection('posts')
      .doc(postId)
      .delete()
      .then(updateCategory);
  }
}
