'use client'

import { BlogForm } from '@/components/BlogForm'
import { useBlogContext } from '@/contexts/blogContext'
import { useFormHook } from '@/hooks/useFormHook'
import { BlogFiledsRequest } from '@/types'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [postId, setPostId] = useState('')
  const formHandler = useFormHook()

  const modalRef = useRef<HTMLDivElement>(null)

  const { isLoading, blogPosts, handleDeletePost } = useBlogContext()

  const handlerModal = (postId: string) => {
    setPostId(postId)
    setShowDeleteModal((prev) => !prev)
  }

  useEffect(() => {
    modalRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [showDeleteModal])

  return (
    <main className=" min-h-screen ">
      <dialog
        open={showDeleteModal}
        className="rounded-2xl absolute top-56 bg-red-300"
      >
        <div className="p-9 flex flex-col gap-4 " ref={modalRef}>
          <h2 className="self-center">Do you want delete this post?</h2>
          <div className="flex justify-around">
            <button
              className="bg-red-800 text-white rounded-2xl p-4"
              data-testid="button-delete-post"
              onClick={() => handleDeletePost(postId)}
            >
              Delete Post
            </button>
            <button
              className="text-black rounded-2xl p-4 bg-red-200"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      <section>
        <div className=" flex flex-col  pt-9 gap-5">
          <h1 className="self-center text-2xl font-black">
            Write your daily journey
          </h1>
          <BlogForm formHandler={formHandler} />

          {isLoading ? (
            <>Loading...</>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              {blogPosts?.map((post: BlogFiledsRequest, index: number) => (
                <div
                  className="flex justify-between bg-blue-300  rounded-2xl p-3 items-center w-80"
                  key={post.id}
                  data-testid="posts"
                >
                  <h4>{post.title}</h4>
                  <div className="flex gap-4">
                    <Link
                      className="bg-blue-400 rounded-xl cursor-pointer p-3"
                      href={`edit-blog/${post.id}`}
                      data-testid='redirect-link-edit'
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-400 rounded-xl cursor-pointer p-3"
                      onClick={() => handlerModal(post.id)}
                      data-testid={'delete-button'}
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
