"use client";

import { useFormHook } from "@/hooks/useFormHook";
import { BlogForm } from "@/components/BlogForm";

export default function Page({ params }: { params: { postId: string } }) {
  const formHandler = useFormHook();

  return (
    <div className="min-h-screen p-7">
      <BlogForm formHandler={formHandler} postId={params.postId} />
    </div>
  );
}
