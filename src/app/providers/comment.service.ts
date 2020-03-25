import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private fireStore: AngularFirestore) {}

  getComments(postId: string): Observable<any> {
    return this.fireStore
      .collection('posts')
      .doc(postId)
      .collection('comments', ref => ref.orderBy('createdDate', 'desc'))
      .valueChanges();
  }

  createComment(postId: string, data) {
    return this.fireStore
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add(data);
  }
}
