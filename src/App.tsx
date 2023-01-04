import React from 'react'
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  useRouteError,
  Routes,
} from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from '@/layout/Layout'
import { routes } from './lib/routes'
import ProtectedRoutes from './components/protected/Protected'
import theme from './theme'
import '@fontsource/roboto/400.css'
import '@fontsource/ubuntu/400.css'
import './App.css'

//Pages
import Home from './pages/Home/Home'
import DailyPage from './pages/DailyPage/DailyPage'
import WeeklyPage from './pages/WeeklyPage/WeeklyPage'
import Registration from './pages/Registration/Registration'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

// const colors = {
//   brand: {
//     primary: 'red',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
//   fonts: {
//     heading: `'Montserrat', sans-serif`,
//     body: `'Roboto', sans-serif`,
//   },
// }
//  { font-family: "Montserrat", sans-serif; }
// { font-family: "Roboto", sans-serif; }

// const extendedTheme = extendTheme({ ...colors, ...theme })

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        // loader={loader}
        path={routes.HOME}
        element={<Layout />}
        errorElement={<ErrorBoundary />}
      >
        <Route index element={<Home />} />

        <Route path={routes.REGISTER} element={<Registration />} />
        <Route path={routes.LOGIN} element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route index path={routes.DASHBOARD} element={<Dashboard />} />
          <Route path={routes.DAILY} element={<DailyPage />} />
          <Route path={routes.WEEKLY} element={<WeeklyPage />} />
        </Route>
      </Route>
    </>
  )
)
function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App

function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  // Uncaught ReferenceError: path is not defined
  return <ErrorPage />
}

function ErrorPage() {
  return <div>Something went wrong</div>
}
