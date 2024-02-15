'use client'

import { BlogForm } from '@/components/BlogForm'
import { useBlogContext } from '@/contexts/blogContext'
import { useFormHook } from '@/hooks/useFormHook'
import { BlogFiledsRequest } from '@/types'
import { useState } from 'react'

export default function Home() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [postId, setPostId] = useState('')

  const { push, isLoading, blogPosts, handleDeletePost } = useBlogContext()

  const handlerModal = (postId: string) => {
    setPostId(postId)
    setShowDeleteModal((prev) => !prev)
  }

  const formHandler = useFormHook()

  return (
    <main className=" min-h-screen ">
      <dialog open={showDeleteModal}>
        <div>
          <h2>Do you want delete this post?</h2>
          <button onClick={() => handleDeletePost(postId)}>Delete Post</button>
          <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
        </div>
      </dialog>
      <section className="">
        <div className=" flex flex-col  pt-9 gap-5">
          <h1 className="self-center text-2xl font-black">
            Write your daily journey
          </h1>
          <BlogForm formHandler={formHandler} />

          {isLoading ? (
            <>Loading...</>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              {blogPosts?.map((post: BlogFiledsRequest) => (
                <div
                  className="flex justify-between bg-purple-300  rounded-2xl p-3 items-center w-80"
                  key={post.id}
                >
                  <h4>{post.title}</h4>
                  <div className="flex gap-4">
                    <button
                      className="bg-purple-500 rounded-xl cursor-pointer p-3"
                      onClick={() => push(`edit-blog/${post.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 rounded-xl cursor-pointer p-3"
                      onClick={() => handlerModal(post.id)}
                    >
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
  )
}
