import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { lazy } from 'react'
//Pages
import Home from '@/pages/Home/HomePage'
const DailyPage = lazy(() => import('@/pages/DailyPage/DailyPage'))
const WeeklyPage = lazy(() => import('@/pages/WeeklyPage/WeeklyPage'))
import Registration from '@/pages/Registration/RegistrationPage'
import Login from '@/pages/Login/LoginPage'
const Dashboard = lazy(() => import('@/pages/Dashboard/DashboardPage'))
import ProtectedRoutes from '@/components/protected/Protected'
import Layout from '@/layout/Layout'
const ErrorPage = lazy(() => import('@/pages/Error/ErrorPage'))
const PasswordReset = lazy(
  () => import('@/pages/PasswordReset/PasswordResetPage')
)
const ProfilePage = lazy(() => import('@/pages/Profile/ProfilePage'))
const ForgotPassword = lazy(
  () => import('@/pages/ForgotPassword/ForgotPasswordPage')
)
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'))

// ROUTE CONSTANTS
export const routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  WEEKLY: '/weekly',
  DAILY: '/daily',
  PASSWORD_RESET: '/password-reset',
  FORGOT_PASSWORD: '/forgot-password',
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
        <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route index path={routes.DASHBOARD} element={<Dashboard />} />
          <Route path={routes.DAILY} element={<DailyPage />} />
          <Route path={routes.WEEKLY} element={<WeeklyPage />} />
          <Route path={routes.PROFILE} element={<ProfilePage />} />
          <Route path={routes.PASSWORD_RESET} element={<PasswordReset />} />
        </Route>
      </Route>
    </>
  )
)

export default router
