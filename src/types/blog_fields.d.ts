export type BlogFields = {
  title: string;
  note: string;
};

export type BlogFiledsRequest = {
  id: string;
  title: string;
  note: string;
  createAt: string;
};

export type CreatePostResponse = {
  message: string
  postCreated: BlogFiledsRequest
}