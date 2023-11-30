import React from 'react'
import { VscGithub, VscMail } from 'react-icons/vsc'
import { SiMailDotRu, SiMailchimp, SiTwitter } from 'react-icons/si'
import Avatar from '../../../avatar.jpg'

interface Props {}

export const Social = (props: Props) => {
  const userName = 'heyprotagonist'

  return (
    <div className="flex items-center justify-between w-11/12 md:justify-start md:space-x-10 h-20">
      <img
        className="text-center w-14 h-14 rounded-full overflow-hidden bg-white"
        src={Avatar}
        alt="Anguram Shanmugam With A Cool Posture 😁"
      />

      <a
        href={`https://github.com/${userName}`}
        className="font-semibold flex items-center justify-between h-14 w-14 border-2 border-transparent hover:border-gray-400 px-4 space-x-1 rounded-full"
      >
        <VscGithub className="w-6 h-6 object-contain" />
      </a>

      <a
        href={`https://twitter.com/${userName}`}
        className="font-semibold flex items-center justify-between h-14 w-14 border-2 border-transparent hover:border-gray-400 px-4 space-x-1 rounded-full"
      >
        <SiTwitter className="w-6 h-6 object-contain" />
      </a>

      <a
        href={`mailto:ThisIsAnguram@gmail.com`}
        className="font-semibold flex items-center justify-between h-14 w-14 border-2 border-transparent hover:border-gray-400 px-4 space-x-1 rounded-full"
      >
        <SiMailDotRu className="w-6 h-6 object-contain" />
      </a>

      {/* <a
        href={`mailto:ThisIsAnguram@gmail.com`}
        className="font-semibold flex items-center justify-between h-14 border-2 border-transparent hover:border-gray-400 px-4 space-x-1 rounded-full"
      >
        <SiTwitter className="w-6 h-6 object-contain" />
      </a> */}
    </div>
  )
}
