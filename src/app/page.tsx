"use client";

import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import { blogRepositoryImpl } from "@/repositories/blogRepository";
import { BlogFields, BlogFiledsRequest } from "@/types";
import { deletePostUseCase } from "@/useCases/deletePostUseCase";
import { getPostsUseCase } from "@/useCases/getPostsUseCase";
import { updatePostUseCase } from "@/useCases/updatePostUseCase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [posts, setPosts] = useState<BlogFiledsRequest[]>();
  const [showModal, setShowModal] = useState(false);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: "",
      note: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);

    reset();
  };
  useEffect(() => {
    const fetchApi = async () => await getPostsUseCase(blogRepositoryImpl);
    fetchApi().then((data) => setPosts(data));
  }, []);

  const handleEditPost = async () => {
    await updatePostUseCase(
      "clsdw6mio0000e2o4gb369uvk",
      {
        title: "essse post foi edidato pelo front",
        note: "Post editado bolado demais",
      },
      blogRepositoryImpl
    );
  };
  const handleDelete = async () => {
    await deletePostUseCase("clsdw6mio0000e2o4gb369uvk", blogRepositoryImpl);
  };

  return (
    <main className=" min-h-screen ">
      <section className="">
        <div className=" flex flex-col  pt-9 gap-5">
          <h1 className="self-center text-2xl font-black">
            Write your daily journey
          </h1>
          <form
            className="flex flex-col items-center justify-between gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              label="title"
              htmlFor="title"
              {...register("title")}
              datatestid="input-title"
            />

            <TextAreaField
              label="note"
              htmlFor="note"
              placeholder="Write your story"
              {...register("note")}
              datatestid="input-note"
            />
            <button type="submit" data-testid="send-button">
              Send journey
            </button>
          </form>
        </div>

        <dialog open={showModal}>
          <p>Gostaria de editar esse post ?</p>
        </dialog>

        <div>
          {posts?.map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <h4>{post.id}</h4>
              <span>{post.createAt}</span>

              <button onClick={handleEditPost}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
