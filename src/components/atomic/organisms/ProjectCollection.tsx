import React from 'react'
import { SectionHeading, ProjectSectionItem } from '../atoms'

interface Props {}

const projectCollectionPayload = [
  {
    githubRepositoryLink: 'https://github.com/retr0c0de/right-work',
    baseProgrammingLanguage: 'JavaScript',
    projectName: 'right-work',
    projectDescription: 'Create, Monitor, etc,. using enterprise task manager',
    stars: 0,
  },
  {
    githubRepositoryLink: 'https://github.com/retr0c0de/daily-works',
    baseProgrammingLanguage: 'JavaScript',
    projectName: 'daily-works',
    projectDescription: 'Job for one day hire/work get monetize your works 😉',
    stars: 0,
  },
]

export const ProjectCollection = (props: Props) => {
  return (
    <div className="flex-col flex space-y-4">
      <SectionHeading title="Projects" />

      <div className="space-y-4">
        {projectCollectionPayload.map((projectItem) => (
          <ProjectSectionItem {...projectItem} />
        ))}
      </div>
    </div>
  )
}
