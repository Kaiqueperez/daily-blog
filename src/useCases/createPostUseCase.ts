import { BLogRespository } from "@/repositories/blogRepository";
import { BlogFields } from "@/types";

export const createPostUseCase = async (
  data: BlogFields,
  repository: BLogRespository
) => {
  return await repository.createBlogPost(data);
};
