import { AttachmentTypes } from '../data/enums';

export class IPost {
  uid?: string; //dynamically added
  userName?: string; //dynamically added

  text: string;
  title: string;
  userId: string;
  category: string;
  createdDate: Date;
  lastActionDate?: Date;
  commentCounter?: number;
  linkType?: AttachmentTypes;
  url?: string;
}
