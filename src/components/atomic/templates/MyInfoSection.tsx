import React from 'react'
import { Greet } from '../atoms'
import { AboutMe, SectionTimeline } from '../molecules'
import { Social } from '../organisms'

interface Props {}

export const MyInfoSection = (props: Props) => {
  return (
    <div className="flex flex-col space-y-10 lg:p-10 lg:space-y-20 lg:w-10/12 justify-evenly lg:h-full max-h-screen">
      <div className="space-y-4">
        <Greet />
        <AboutMe />
      </div>
      <SectionTimeline />
      <Social />
    </div>
  )
}
