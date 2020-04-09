import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    const data = {
      ...post,
      lastActionDate: post.createdDate,
    };
    return this.fireStore.collection('posts').add(data);
  }

  deletePost(postId: string) {
    return this.fireStore.collection('posts').doc(postId).delete();
  }
}
