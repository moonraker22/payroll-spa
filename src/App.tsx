import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  useRouteError,
} from 'react-router-dom'
import { initialState, reducer, payTypes } from './stores/payReducer'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from './layout/Layout'
import './App.css'

//Pages
import Home from './pages/Home'
import DailyPage from './pages/DailyPage'
import WeeklyPage from './pages/WeeklyPage'

const colors = {
  brand: {
    primary: 'red',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="daily" element={<DailyPage />} />
      <Route path="weekly" element={<WeeklyPage />} />
    </Route>
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
  return <div>Dang!</div>
}
