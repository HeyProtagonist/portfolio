import React from 'react'
import { MyInfoSection, MyWorks } from '../atomic/templates'

interface Props {}

export const Home = (props: Props) => {
  return (
    <div className="lg:grid bg-gray-900 p-8 text-white space-y-20 lg:grid-cols-2 lg:grid-rows-1 lg:space-y-0 min-h-screen">
      <MyInfoSection />
      <MyWorks />
    </div>
  )
}
