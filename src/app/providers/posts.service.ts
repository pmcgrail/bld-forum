import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private fireStore: AngularFirestore) {}

  getPosts() {
    return this.fireStore
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map(posts =>
          posts.map(post => {
            return {
              id: post.payload.doc.id,
              data: post.payload.doc.data(),
            };
          })
        )
      );
  }

  getPost(postId: string) {
    return this.fireStore
      .collection('posts')
      .doc(postId)
      .valueChanges();
  }

  createPost(data) {
    return this.fireStore.collection('posts').add(data);
  }
}
