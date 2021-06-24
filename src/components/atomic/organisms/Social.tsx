import React from 'react'
import { VscGithub } from 'react-icons/vsc'
import { SiTwitter } from 'react-icons/si'

interface Props {}

export const Social = (props: Props) => {
  return (
    <div className="flex items-center justify-between w-11/12 md:justify-start md:space-x-10 h-20">
      <img
        className="text-center w-14 h-14 rounded-full overflow-hidden"
        src="https://avatars.githubusercontent.com/u/75655740?v=4"
        alt="ARM"
      />

      <div className="w-20 flex items-center justify-between h-14">
        <VscGithub className="w-6 h-6 object-contain" />
        <a href="https://github.com/retr0c0de" className="font-semibold">
          Github
        </a>
      </div>

      <div className="w-20 flex items-center justify-between h-14">
        <SiTwitter className="w-6 h-6 object-contain" />
        <a href="https://twitter.com/retr0c0de" className="font-semibold">
          Twitter
        </a>
      </div>
    </div>
  )
}
