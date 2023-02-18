import SpinnerComp from '@/components/SpinnerComp'
import { routes } from '@/layout/routes'
import { useStore } from '@/stores/store'
import { Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

// Protected route

const ProtectedRoutes = () => {
  const snap = useStore()
  const location = useLocation()

  return snap.isSignedIn ? (
    <Suspense fallback={<SpinnerComp />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={routes.HOME} state={{ from: location }} replace />
  )
}

export default ProtectedRoutes
