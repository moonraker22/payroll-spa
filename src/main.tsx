import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, useRouteError } from 'react-router-dom'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { ColorModeScript } from '@chakra-ui/react'
import App from './App'
import theme from './theme'
import './index.css'

const container = document.getElementById('root') as HTMLElement
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />} />,
  ])
)

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>
)

function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>
}
