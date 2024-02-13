import { BLogRespository } from "@/repositories/blogRepository";

export const getPostsUseCase = async (
  repository: BLogRespository,
  id?: string
) => {
  const data = await repository.getBlogsPosts();

  if (id) {
    return data.find((post) => post.id === id);
  }

  return data;
};
