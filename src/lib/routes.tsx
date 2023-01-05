import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

//Pages
import Home from '@/pages/Home/Home'
import DailyPage from '@/pages/DailyPage/DailyPage'
import WeeklyPage from '@/pages/WeeklyPage/WeeklyPage'
import Registration from '@/pages/Registration/Registration'
import Login from '@/pages/Login/Login'
import Dashboard from '@/pages/Dashboard/Dashboard'
import ProtectedRoutes from '@/components/protected/Protected'
import Layout from '@/layout/Layout'
import ErrorPage from '@/pages/Error/ErrorPage'

// ROUTE CONSTANTS
export const routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  WEEKLY: '/weekly',
  DAILY: '/daily',
}

export const PROTECTED = '/protected'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        // loader={loader}
        path={routes.HOME}
        element={<Layout />}
        errorElement={<ErrorPage />}
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

export default router
