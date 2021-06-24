import React from 'react'

interface Props {}

export const SectionTimeline = (props: Props) => {
  return (
    <div className="hidden lg:block">
      <div className="font-thin text-xl flex flex-col space-y-6">
        <p className="font-bold tracking-widest">- Projects</p>
        <p className="">- Blog</p>
      </div>
    </div>
  )
}
