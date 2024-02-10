import { BLogRespository } from "@/repositories/blogRepository";
import { BlogFields } from "@/types";

export const updatePostUseCase = async (
  postId: string,
  updatePost: BlogFields,
  repository: BLogRespository
) => {
  await repository.updateBlogPost(postId, updatePost);
};
