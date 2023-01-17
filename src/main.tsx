import React from 'react'
import ReactDOM from 'react-dom/client'

import { ColorModeScript } from '@chakra-ui/react'
import App from './App'
import theme from './theme'
import './index.css'

const container = document.getElementById('root') as HTMLElement
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
