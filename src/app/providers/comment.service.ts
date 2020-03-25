import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IComment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private fireStore: AngularFirestore) {}

  getComments(postId: string): Observable<IComment[]> {
    return this.fireStore
      .collection('posts')
      .doc(postId)
      .collection<IComment[]>('comments', ref => ref.orderBy('createdDate'))
      .valueChanges()
      .pipe(
        map((comments: any) => {
          return comments.map(comment => {
            const createdDate = new Date(comment.createdDate.seconds * 1000);
            return {
              ...comment,
              createdDate,
            };
          });
        })
      );
  }

  createComment(postId: string, data) {
    return this.fireStore
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add(data);
  }
}
