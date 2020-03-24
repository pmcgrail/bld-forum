export class IPost {
  id: string;
  data: IPostData;
}

export class IPostData {
  text: string;
  title: string;
  userId: string;
  createdDate: Date;
}
