export interface IComment {
  uid?: string; //dynamically added
  userName?: string; //dynamically added

  text: string;
  userId: string;
  createdDate: Date;
}
