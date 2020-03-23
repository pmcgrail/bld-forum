import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private fireStore: AngularFirestore) {}

  createPost(data) {
    return this.fireStore.collection('posts').add(data);
  }
}
