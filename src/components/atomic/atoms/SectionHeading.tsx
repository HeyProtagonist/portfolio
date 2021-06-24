import React from 'react'

interface Props {
  title: string
}

export const SectionHeading = ({ title }: Props) => {
  return (
    <h1 className="font-semibold text-lg uppercase tracking-widest lg:hidden mt-10">
      {title}
    </h1>
  )
}
