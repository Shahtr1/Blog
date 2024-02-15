export interface IComment {
  _id: string;
  content: string;
  postId: string;
  userId: string;
  likes: any;
  numberOfLikes: number;
  updatedAt: string;
  createdAt: string;
}
