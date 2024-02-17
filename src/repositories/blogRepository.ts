import { BlogFields, BlogFiledsRequest, CreatePostResponse } from "@/types";

export type BLogRespository = {
  createBlogPost: (data: BlogFields) => Promise<CreatePostResponse>;
  getBlogsPosts: () => Promise<BlogFiledsRequest[]>;
  updateBlogPost: (postId: string, data: BlogFields) => Promise<void>;
  deleteBlogPost: (postId: string) => Promise<void>;
};

export const blogRepositoryImpl: BLogRespository = {
  createBlogPost: async (data) => {
    try {
       return await fetch(`${process.env.NEXT_PUBLIC_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(data => data.json());

      
    } catch (error) {
      console.error(error);
    }
  },
  getBlogsPosts: async () => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}`).then((res) =>
        res.json()
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  updateBlogPost: async (postId, data) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  },
  deleteBlogPost: async (postId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/blog/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  },
};
