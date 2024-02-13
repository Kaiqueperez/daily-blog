import { BLogRespository } from "@/repositories/blogRepository";
import { BlogFields } from "@/types";

export const createPostUseCase = async (
  data: BlogFields,
  repository: BLogRespository
) => {
  await repository.createBlogPost(data);
};
