import React from 'react'
import { BlogSectionItem, SectionHeading } from '../atoms'

interface Props {}

const blogCollectionPayload = [
  {
    blogPostLink: 'https://dev.to/retr0c0de/learn-fullstack-2021-54gd',
    blogPostName: 'Learn Fullstack | 2021',
  },
  {
    blogPostLink: 'https://dev.to/retr0c0de/event-l-p-2do1',
    blogPostName: 'Event Loop',
  },
]

export const BlogCollection = (props: Props) => {
  return (
    <div className="flex-col flex space-y-4">
      <SectionHeading title="Blog" />

      <div className="lg:grid lg:grid-cols-2 gap-6 space-y-6 lg:space-y-0">
        {blogCollectionPayload.map((blogItem) => (
          <BlogSectionItem {...blogItem} />
        ))}
      </div>
    </div>
  )
}
