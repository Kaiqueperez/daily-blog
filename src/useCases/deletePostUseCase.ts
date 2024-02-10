import { BLogRespository } from "@/repositories/blogRepository";

export const deletePostUseCase = async (
  postId: string,
  repository: BLogRespository
) => {
  await repository.deleteBlogPost(postId);
};
