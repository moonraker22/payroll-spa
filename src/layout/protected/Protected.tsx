import SpinnerComp from '@/components/SpinnerComp'
import { routes } from '@/layout/routes'
import { useFireAuth } from '@/stores/auth'
import { Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

// Protected route

const ProtectedRoutes: () => JSX.Element = () => {
  const location = useLocation()

  const { isSignedIn } = useFireAuth()
  const { isLoading } = useFireAuth()

  if (isLoading) {
    return <SpinnerComp />
  }

  return isSignedIn ? (
    <Suspense fallback={<SpinnerComp />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={routes.HOME} state={{ from: location }} replace />
  )
}

export default ProtectedRoutes
