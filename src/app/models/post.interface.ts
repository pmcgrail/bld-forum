export class IPost {
  uid?: string; //dynamically added

  text: string;
  title: string;
  userId: string;
  createdDate: Date;
  lastActionDate?: Date;
  commentCounter?: number;

  userName?: string; //dynamically added
}
