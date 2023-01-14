import { useIdToken } from 'react-firebase-hooks/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { auth } from '@/firebase'
import SpinnerComp from '@/components/SpinnerComp'
import { routes } from '../../lib/routes'

// Protected route

const ProtectedRoutes = () => {
  const [user, loading, error] = useIdToken(auth)
  const location = useLocation()

  //   const isAuth = useAuth();
  if (loading)
    return (
      <div>
        <SpinnerComp />
      </div>
    )
  if (error) return <div>Error...</div>
  const isAuth = user
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={routes.HOME} state={{ from: location }} replace />
  )
}

export default ProtectedRoutes
