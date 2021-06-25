import React from 'react'
import { BlogCollection, ProjectCollection } from '../organisms/index'

interface Props {}

export const MyWorks = (props: Props) => {
  return (
    <div className="auto-rows-fr overflow-y-scroll scrollbar-hide flex flex-col max-h-full space-y-10">
        <ProjectCollection />
        <BlogCollection />
    </div>
  )
}
