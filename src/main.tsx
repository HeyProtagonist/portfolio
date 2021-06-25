import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const APP = (
  <StrictMode>
    <App />
  </StrictMode>
)

ReactDOM.render(APP, document.getElementById('root'))
