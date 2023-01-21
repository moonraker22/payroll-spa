import SpinnerComp from '@/components/SpinnerComp'
import { routes } from '@/lib/routes'
import { useStore } from '@/stores/store'
import { Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

// Protected route

const ProtectedRoutes = () => {
  // const [user, loading, error] = useIdToken(auth)
  const snap = useStore()
  const location = useLocation()

  // if (loading)
  //   return (
  //     <div>
  //       <SpinnerComp />
  //     </div>
  //   )
  // if (error) return <div>Error...</div>
  // const isAuth = user
  return snap.isSignedIn ? (
    <Suspense fallback={<SpinnerComp />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={routes.HOME} state={{ from: location }} replace />
  )
}

export default ProtectedRoutes
