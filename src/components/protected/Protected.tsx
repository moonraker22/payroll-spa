import { useIdToken } from 'react-firebase-hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '@/firebaseConf'
import SpinnerComp from '@/components/SpinnerComp'

// Protected route

const ProtectedRoutes = () => {
  const [user, loading, error] = useIdToken(auth)

  //   const isAuth = useAuth();
  if (loading)
    return (
      <div>
        <SpinnerComp />
      </div>
    )
  if (error) return <div>Error...</div>
  const isAuth = user
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
