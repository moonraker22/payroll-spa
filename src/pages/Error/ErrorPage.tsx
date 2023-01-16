import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'
import { routes } from '../../lib/routes'
import { useEffect } from 'react'

export default function RootBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (
  //     JSON.stringify(error) ===
  //     '{"code":"invalid-argument","name":"FirebaseError"}'
  //   ) {
  //     navigate(routes.DASHBOARD)
  //   }
  // }, [error, navigate])
  console.log('🚀 ~ file: ErrorPage.tsx:27 ~ RootBoundary ~ error', error)

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>
    }

    if (error.status === 418) {
      return <div>🫖</div>
    }
  }

  return (
    <>
      <div>Something went wrong</div>
      <div>{JSON.stringify(error)}</div>
    </>
  )
}
