import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { IComment } from '../models';
import { MAX_COMMENTS } from '../data';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private fireStore: AngularFirestore) {}

  getComments(
    postId: string,
    next: boolean = true,
    from: Date = undefined
  ): Observable<IComment[]> {
    const pagedQuery = (ref: CollectionReference) => {
      if (from) {
        if (next) {
          return ref
            .orderBy('createdDate')
            .startAfter(from)
            .limit(MAX_COMMENTS);
        } else {
          console.log('endBefore');
          return ref
            .orderBy('createdDate')
            .endBefore(from)
            .limit(MAX_COMMENTS);
        }
      }
      return ref.orderBy('createdDate').limit(MAX_COMMENTS);
    };

    return this.fireStore
      .collection('posts')
      .doc(postId)
      .collection<IComment[]>('comments', pagedQuery)
      .valueChanges()
      .pipe(
        map((comments: any) => {
          return comments.map(comment => {
            const createdDate = comment.createdDate.toDate();
            return {
              ...comment,
              createdDate,
            };
          });
        })
      );
  }

  createComment(postId: string, comment: IComment) {
    return this.fireStore
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add(comment)
      .then(
        () => {
          this.fireStore
            .collection('posts')
            .doc(postId)
            .set(
              {
                lastActionDate: comment.createdDate,
                commentCounter: firebase.firestore.FieldValue.increment(1),
              },
              { merge: true }
            );
        },
        error => {
          console.log(error);
        }
      );
  }
}
