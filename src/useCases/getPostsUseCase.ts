import { BLogRespository } from "@/repositories/blogRepository";

export const getPostsUseCase = async (repository: BLogRespository) => {
  const data = await repository.getBlogsPosts();

  return data;
};
