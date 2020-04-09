import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

interface ICollectionConfig {
  collection: string;
  idKey: string;
}

const POSTS: ICollectionConfig = {
  collection: 'report_posts',
  idKey: 'postId',
};

const COMMENTS: ICollectionConfig = {
  collection: 'report_comments',
  idKey: 'commentId',
};

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private firestore: AngularFirestore) {}

  async reportPost(postId: string, userId: string): Promise<any> {
    const exists = await this.reportExists(POSTS, postId, userId);
    if (exists) {
      throw new Error('post reported by this user already');
    }
    return this.createReport(POSTS, postId, userId);
  }

  async reportComment(commentId: string, userId): Promise<any> {
    const exists = await this.reportExists(COMMENTS, commentId, userId);
    if (exists) {
      throw new Error('comment reported by this user already');
    }
    return this.createReport(COMMENTS, commentId, userId);
  }

  async createReport(config: ICollectionConfig, objId: string, userId: string) {
    return this.firestore.collection(config.collection).add({
      userId,
      [config.idKey]: objId,
    });
  }

  async reportExists(
    config: ICollectionConfig,
    objId: string,
    userId: string
  ): Promise<boolean> {
    return this.firestore
      .collection(config.collection, (ref) =>
        ref.where(config.idKey, '==', objId).where('userId', '==', userId)
      )
      .get()
      .pipe(map((reports) => reports.size > 0))
      .toPromise();
  }
}
