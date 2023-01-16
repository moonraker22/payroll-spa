import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

//Pages
import Home from '@/pages/Home/HomePage'
import DailyPage from '@/pages/DailyPage/DailyPage'
import WeeklyPage from '@/pages/WeeklyPage/WeeklyPage'
import Registration from '@/pages/Registration/RegistrationPage'
import Login from '@/pages/Login/LoginPage'
import Dashboard from '@/pages/Dashboard/DashboardPage'
import ProtectedRoutes from '@/components/protected/Protected'
import Layout from '@/layout/Layout'
import ErrorPage from '@/pages/Error/ErrorPage'
import PasswordReset from '@/pages/PasswordReset/PasswordResetPage'
import ProfilePage from '@/pages/Profile/ProfilePage'
import ForgotPassword from '@/pages/ForgotPassword/ForgotPasswordPage'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'

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
