// @moonraker22

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

const container = document.getElementById('root') as HTMLElement
if (container === null) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
