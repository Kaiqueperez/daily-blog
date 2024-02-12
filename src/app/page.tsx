"use client";

import { BlogForm } from "@/components/BlogForm";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import { useFormHook } from "@/hooks/useFormHook";
import { blogRepositoryImpl } from "@/repositories/blogRepository";
import { BlogFiledsRequest } from "@/types";
import { getPostsUseCase } from "@/useCases/getPostsUseCase";
import useSWR from "swr";

export default function Home() {
  const formHandler = useFormHook();
  const { isLoading, data: blogPosts } = useSWR("blogPosts", {
    fetcher: () => getPostsUseCase(blogRepositoryImpl),
  });

  return (
    <main className=" min-h-screen ">
      <section className="">
        <div className=" flex flex-col  pt-9 gap-5">
          <h1 className="self-center text-2xl font-black">
            Write your daily journey
          </h1>
          <BlogForm formHandler={formHandler} />

          {isLoading ? (
            <>Loading...</>
          ) : (
            <div className="flex flex-col gap-4">
              {blogPosts?.map((post: BlogFiledsRequest) => (
                <div
                  className="flex justify-between bg-purple-300  rounded-2xl p-3 items-center"
                  key={post.id}
                >
                  <h4>{post.title}</h4>
                  <div className="flex gap-4">
                    <button className="bg-purple-500 rounded-xl cursor-pointer p-3">
                      Edit
                    </button>
                    <button className="bg-red-400 rounded-xl cursor-pointer p-3">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
