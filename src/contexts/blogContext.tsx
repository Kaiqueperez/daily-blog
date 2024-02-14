'use client'
import { blogRepositoryImpl } from '@/repositories/'
import { dialogStyles } from '@/styles'
import { BlogFields, BlogFiledsRequest, dialogText } from '@/types'
import {
  getPostsUseCase,
  createPostUseCase,
  updatePostUseCase,
  deletePostUseCase,
} from '@/useCases'
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useContext, useState } from 'react'
import useSWR from 'swr'

interface BlogContextProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  showModal: boolean
  handlerCreatePost: (data: BlogFields) => Promise<void>
  handleUpdatePost: (postId: string, updatePost: BlogFields) => Promise<void>
  handleDeletePost: (postId: string) => Promise<void>
  blogPosts: BlogFiledsRequest[]
  isLoading: boolean
  push: (href: string, options?: NavigateOptions | undefined) => void
  refresh: () => void
}
interface BlogContextProviderProps {
  children?: React.ReactNode
}
export const BlogContextProvider: React.FC<BlogContextProviderProps> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false)

  const [dialogText, setDialogText] = useState<dialogText>('send')

  const { refresh, push } = useRouter()
  const pathName = usePathname()

  const handleModal = (text: dialogText) => {
    setDialogText(text)
    setShowModal((prev) => !prev)
  }

  const { isLoading, data: blogPosts } = useSWR('blogPosts', {
    fetcher: () => getPostsUseCase(blogRepositoryImpl),
    keepPreviousData: true,
  })

  const handlerCreatePost = async (data: BlogFields) => {
    await createPostUseCase(data, blogRepositoryImpl)
    handleModal('send')
    setTimeout(() => {
      handleModal('send')
      refresh()
    }, 2500)
  }

  const handleUpdatePost = async (postId: string, updatePost: BlogFields) => {
    await updatePostUseCase(postId, updatePost, blogRepositoryImpl)
    handleModal('edit')
    setTimeout(() => {
      handleModal('edit')
      push('/')
    }, 2500)
  }

  const handleDeletePost = async (postId: string) => {
    await deletePostUseCase(postId, blogRepositoryImpl)
    refresh()
  }

  return (
    <BlogContext.Provider
      value={{
        setShowModal,
        showModal,
        handlerCreatePost,
        handleUpdatePost,
        blogPosts,
        isLoading,
        push,
        refresh,
        handleDeletePost,
      }}
    >
      {children}

      <dialog
        className={`${showModal ? dialogStyles[dialogText] : ''} `}
        open={showModal}
      >
        {pathName.includes('edit-blog') ? 'Post edited' : 'Post created'}
      </dialog>
    </BlogContext.Provider>
  )
}
const BlogContext = createContext<BlogContextProps | undefined>(undefined)
export function useBlogContext() {
  const context = useContext(BlogContext)
  if (!context) {
    throw Error('use BlogContext must be wrap your application')
  }
  return context
}
