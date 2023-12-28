import React from 'react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Home } from './components/pages/index'

function App() {
  return (
    <>
      <div className="text-gray-50">
        <Home />
      </div>

      <SpeedInsights/>
    </>
  )
}

export default App
