import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IPost } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts$: Observable<any>;

  constructor(private fireStore: AngularFirestore) {
    this.posts$ = this.fireStore
      .collection('posts', ref => ref.orderBy('lastActionDate', 'desc'))
      .snapshotChanges();
  }

  getPosts(): Observable<IPost[]> {
    return this.posts$.pipe(
      map(posts =>
        posts.map(post => {
          const data = post.payload.doc.data();
          const createdDate = new Date(data.createdDate.seconds * 1000);
          return {
            ...data,
            createdDate,
            uid: post.payload.doc.id,
          };
        })
      )
    );
  }

  getPost(postId: string): Observable<IPost> {
    return this.fireStore
      .collection('posts')
      .doc<IPost>(postId)
      .valueChanges()
      .pipe(
        map((post: any) => {
          const createdDate = new Date(post.createdDate.seconds * 1000);
          return {
            ...post,
            createdDate,
          };
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
}
