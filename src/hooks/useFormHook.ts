import { BlogFields, BlogFiledsRequest } from "@/types";
import { useForm } from "react-hook-form";

export const useFormHook = () =>
  useForm<BlogFields>({
    defaultValues: {
      title: "",
      note: "",
    },
    shouldUseNativeValidation: true,
  });
