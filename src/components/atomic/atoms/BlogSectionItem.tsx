import React from 'react'

interface Props {
  blogPostLink: string
  blogPostName: string
}

export const BlogSectionItem = ({ blogPostLink, blogPostName }: Props) => {
  return (
    <a
      target="_blank"
      href={blogPostLink}
      className="bg-gray-800 p-10 space-y-2 block text-center hover:bg-gray-700 hover:bg-opacity-50"
    >
      <p className="font-semibold text-2xl">{blogPostName}</p>
    </a>
  )
}
