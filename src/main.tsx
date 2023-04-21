import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Analytics } from '@vercel/analytics/react'

const APP = (
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
)

ReactDOM.render(APP, document.getElementById('root'))
