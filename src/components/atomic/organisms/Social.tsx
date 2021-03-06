import React from 'react'
import { VscGithub } from 'react-icons/vsc'
import { SiTwitter } from 'react-icons/si'

interface Props {}

export const Social = (props: Props) => {
  return (
    <div className="flex items-center justify-between w-11/12 md:justify-start md:space-x-10 h-20">
      <img
        className="text-center w-14 h-14 rounded-full overflow-hidden bg-white"
        src="https://avatars.githubusercontent.com/u/75655740?v=4"
        alt=""
      />

      <a
        href="https://github.com/retr0c0de"
        className="font-semibold flex items-center justify-between h-14 border-2 border-transparent hover:border-gray-400 px-4 space-x-3 rounded-full"
      >
        <VscGithub className="w-6 h-6 object-contain" />
        <p>Github</p>
      </a>

      <a
        href="https://github.com/retr0c0de"
        className="font-semibold flex items-center justify-between h-14 border-2 border-transparent hover:border-gray-400 px-4 space-x-3 rounded-full"
      >
        <SiTwitter className="w-6 h-6 object-contain" />
        <p>Twitter</p>
      </a>
    </div>
  )
}
