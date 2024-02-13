import { UseFormReturn, useWatch } from "react-hook-form";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import { BlogFields, BlogFiledsRequest } from "@/types";
import { useEffect } from "react";
import { blogRepositoryImpl } from "@/repositories/blogRepository";
import { getPostsUseCase } from "@/useCases/getPostsUseCase";
import useSWR from "swr";
import { updatePostUseCase } from "@/useCases/updatePostUseCase";
import useSWRMutation from "swr/mutation";
import { Ruthie } from "next/font/google";
import { createPostUseCase } from "@/useCases/createPostUseCase";
import { deletePostUseCase } from "@/useCases/deletePostUseCase";

type BLogFormProps = {
  formHandler: UseFormReturn<BlogFields, any, BlogFields>;
  postId?: string;
};

export const BlogForm = ({ formHandler, postId }: BLogFormProps) => {
  const { handleSubmit, register, reset, watch, setValue } = formHandler;

  const { isLoading } = useSWR("getUniquePost", {
    fetcher: () => getPostsUseCase(blogRepositoryImpl, postId),
    onSuccess(data: BlogFiledsRequest) {
      setValue("note", data.note);
      setValue("title", data.title);
    },
  });

  const onSubmit = async (data: BlogFields) => {
    postId
      ? await updatePostUseCase(postId!, data, blogRepositoryImpl)
      : await createPostUseCase(data, blogRepositoryImpl);

    reset();
  };

  const handlerDeletePost = async (postId: string) => {
    await deletePostUseCase(postId, blogRepositoryImpl);
  };

  const isFil = watch("note") !== "" && watch("title") !== "";

  return (
    <form
      className="flex flex-col items-center justify-between gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        placeholder="Today was a good day"
        label="Title of note"
        htmlFor="title"
        {...register("title", { required: "This field is required" })}
        datatestid="input-title"
      />

      <TextAreaField
        label="Note"
        htmlFor="note"
        placeholder="Write your story"
        {...register("note", { required: "This field is required" })}
        datatestid="input-note"
      />

      {postId ? (
        <button
          type="submit"
          data-testid="send-button"
          className="bg-green-300 p-4 rounded-2xl text-white disabled:bg-gray-300 text-gray-500"
          disabled={!isFil}
        >
          Edit
        </button>
      ) : (
        <button
          type="submit"
          data-testid="send-button"
          className="bg-green-300 p-4 rounded-2xl text-white disabled:bg-gray-300 text-gray-500"
          disabled={!isFil}
        >
          Send
        </button>
      )}
    </form>
  );
};
