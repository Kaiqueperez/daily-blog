import { BlogFields, BlogFiledsRequest } from "@/types";

export type BLogRespository = {
  createBlogPost: (data: BlogFields) => Promise<void>;
  getBlogsPosts: () => Promise<BlogFiledsRequest[]>;
  updateBlogPost: (postId: string, data: BlogFields) => Promise<void>;
  deleteBlogPost: (postId: string) => Promise<void>;
};

export const blogRepositoryImpl: BLogRespository = {
  createBlogPost: async (data) => {
    try {
      await fetch("https://dailyapi-deploy.onrender.com/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }
  },
  getBlogsPosts: async () => {
    try {
      const data = await fetch("https://dailyapi-deploy.onrender.com").then(
        (res) => res.json()
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  updateBlogPost: async (postId, data) => {
    try {
      await fetch(`https://dailyapi-deploy.onrender.com/post/${postId}`, {
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
      await fetch(`https://dailyapi-deploy.onrender.com/blog/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  },
};
