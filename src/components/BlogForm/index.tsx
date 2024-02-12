import { UseFormReturn } from "react-hook-form";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";

import { BlogFields } from "@/types";

type BLogFormProps = {
  formHandler: UseFormReturn<BlogFields, any, BlogFields>;
};

export const BlogForm = ({ formHandler }: BLogFormProps) => {
  const { handleSubmit, register, reset, watch } = formHandler;

  const onSubmit = async (data: any) => {
    console.log(data);

    reset();
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
      <button
        type="submit"
        data-testid="send-button"
        className="bg-green-300 p-4 rounded-2xl text-white disabled:bg-gray-300 text-gray-500"
        disabled={!isFil}
      >
        Send
      </button>
    </form>
  );
};