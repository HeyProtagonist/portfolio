import React from 'react'

interface Props {
  githubRepositoryLink: string
  baseProgrammingLanguage: string
  projectName: string
  projectDescription: string
  stars: number
}

export const ProjectSectionItem = ({
  githubRepositoryLink,
  baseProgrammingLanguage,
  projectName,
  projectDescription,
  stars,
}: Props) => {
  return (
    <a
      target="_blank"
      href={githubRepositoryLink}
      className="bg-gray-800 p-10 space-y-2 block"
    >
      <p className="font-normal">{baseProgrammingLanguage}</p>
      <p className="font-semibold text-2xl">{projectName}</p>
      <p className="font-light md:text-sm">{projectDescription}</p>
      <p>{`⭐  ${stars}`}</p>
    </a>
  )
}
