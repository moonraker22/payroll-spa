import { lazy } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

// Pages
const ProtectedRoutes = lazy(
  async () => await import('@/layout/protected/Protected')
)
const ProtectedAdmin = lazy(
  async () => await import('@/layout/protected/ProtectedAdmin')
)
const Layout = lazy(async () => await import('@/layout/Layout'))
const Home = lazy(async () => await import('@/pages/Home/HomePage'))
const Login = lazy(async () => await import('@/pages/Login/LoginPage'))
const Registration = lazy(
  async () => await import('@/pages/Registration/RegistrationPage')
)
const DailyPage = lazy(async () => await import('@/pages/DailyPage/DailyPage'))
const WeeklyPage = lazy(
  async () => await import('@/pages/WeeklyPage/WeeklyPage')
)
const Dashboard = lazy(
  async () => await import('@/pages/Dashboard/DashboardPage')
)
const AdminDashboardPage = lazy(
  async () => await import('@/pages/AdminDashboard/AdminDashboardPage')
)
const ErrorPage = lazy(async () => await import('@/pages/Error/ErrorPage'))
const NotFoundPage = lazy(
  async () => await import('@/pages/NotFoundPage/NotFoundPage')
)
const PasswordReset = lazy(
  async () => await import('@/pages/PasswordReset/PasswordResetPage')
)
const ProfilePage = lazy(
  async () => await import('@/pages/Profile/ProfilePage')
)
const ForgotPassword = lazy(
  async () => await import('@/pages/ForgotPassword/ForgotPasswordPage')
)
const ChangeEmail = lazy(
  async () => await import('@/pages/ChangeEmail/ChangeEmailPage')
)

// ROUTE CONSTANTS
export const routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin-dashboard',
  PROFILE: '/profile',
  WEEKLY: '/weekly',
  DAILY: '/daily',
  PASSWORD_RESET: '/password-reset',
  FORGOT_PASSWORD: '/forgot-password',
  CHANGE_EMAIL: '/change-email',
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
          <Route path={routes.CHANGE_EMAIL} element={<ChangeEmail />} />
          {/* Protected Admin Routes */}
        </Route>
        <Route element={<ProtectedAdmin />}>
          <Route
            index
            path={routes.ADMIN_DASHBOARD}
            element={<AdminDashboardPage />}
          />
        </Route>
      </Route>
    </>
  )
)

export default router
