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
      .pipe(map(posts => posts.map(post => post.payload.doc.data())));
  }

  createPost(data) {
    return this.fireStore.collection('posts').add(data);
  }
}
