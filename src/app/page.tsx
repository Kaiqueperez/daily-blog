"use client";

import { InputField } from "@/components/InputField";
import { TextAreaField } from "@/components/TextAreaField";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    await fetch("https://dailyapi-deploy.onrender.com/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    reset();
  };

  useEffect(() => {
    const fetchapi = async () =>
      await fetch("https://dailyapi-deploy.onrender.com")
        .then((res) => res.json())
        .then((res) => console.log(res));
    fetchapi();
  }, []);
  return (
    <main className=" min-h-screen ">
      <section className="">
        <div className=" flex flex-col  pt-9 gap-5">
          <h1 className="self-center text-2xl font-black">
            Write your daily journey
          </h1>
          <form
            className="flex flex-col items-center justify-between gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              label="title"
              htmlFor="title"
              {...register("title")}
              dataTestId="input-title"
            />

            <TextAreaField
              label="note"
              htmlFor="note"
              placeholder="Write your story"
              {...register("note")}
              dataTestId="input-note"
            />
            <button type="submit" data-testid="send-button">
              Send journey
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
