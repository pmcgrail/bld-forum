import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { IComment } from '../models';
import { MAX_COMMENTS } from '../data';

const mapDate = (comment: any) => {
  const createdDate = comment.createdDate.toDate();
  return {
    ...comment,
    createdDate,
  };
};

const mapSortDates = (comments: any[]) => {
  return comments.map(mapDate).sort((a, b) => a.createdDate - b.createdDate);
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private fireStore: AngularFirestore) {}

  getComments(
    postId: string,
    next: boolean = true,
    from?: Date
  ): Observable<IComment[]> {
    const pagedQuery = (ref: CollectionReference) => {
      return ref
        .orderBy('createdDate', next ? 'asc' : 'desc')
        .startAfter(from ? from : 0)
        .limit(MAX_COMMENTS);
    };

    return this.fireStore
      .collection('posts')
      .doc(postId)
      .collection<IComment[]>('comments', pagedQuery)
      .valueChanges()
      .pipe(map(mapSortDates));
  }

  createComment(postId: string, comment: IComment) {
    const postData = {
      lastActionDate: comment.createdDate,
      commentCounter: firebase.firestore.FieldValue.increment(1),
    };
    const updatePost = () => {
      this.fireStore
        .collection('posts')
        .doc(postId)
        .set(postData, { merge: true });
    };

    return this.fireStore
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add(comment)
      .then(updatePost, error => {
        console.log(error);
      });
  }
}
