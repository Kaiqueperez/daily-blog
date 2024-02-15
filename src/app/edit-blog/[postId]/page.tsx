'use client'

import { useFormHook } from '@/hooks/useFormHook'
import { BlogForm } from '@/components/BlogForm'
import { blogRepositoryImpl } from '@/repositories'
import { getPostsUseCase } from '@/useCases'
import useSWR from 'swr'

export default function Page({ params }: { params: { postId: string } }) {
  const formHandler = useFormHook()
  const { data } = useSWR('getUniquePost', {
    fetcher: () => getPostsUseCase(blogRepositoryImpl, params.postId),
  })

  return (
    <div className="min-h-screen p-7">
      <BlogForm formHandler={formHandler} postToEdit={data} />
    </div>
  )
}
