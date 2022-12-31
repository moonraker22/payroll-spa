import { useIdToken } from 'react-firebase-hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '@/firebaseConf'

// Protected route

const ProtectedRoutes = () => {
  const [user, loading, error] = useIdToken(auth)

  //   const isAuth = useAuth();
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  const isAuth = user
  return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
