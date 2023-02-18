import { auth, db } from '@/firebase'
import { routes } from '@/layout/routes'
import { COLLECTIONS, firebaseErrorMap } from '@/lib/constants'
import { store, storeActions, useStore } from '@/stores/store'
import { useToast } from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type AuthError,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom'

interface useAuthType {
  user: DocumentData | null | undefined
  isLoading: boolean
}

export function useAuth(): useAuthType {
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState<DocumentData | undefined | null>(null)
  const snap = useStore()

  const fetchData = useCallback(async () => {
    setLoading(true)
    const ref = doc(db, 'users', `${snap.isSignedIn ? snap.userId : ''}`)
    try {
      const docSnap = await getDoc(ref)
      setUser(docSnap.data())
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [snap])

  useEffect(() => {
    if (snap.isSignedIn) {
      fetchData().catch((error) => {
        console.error(error)
      })
    } else {
      setLoading(false)
    }
  }, [snap])

  return { user, isLoading }
}

interface LoginProps {
  email: string
  password: string
  redirectTo?: string
}
interface useLoginType {
  login: ({ email, password, redirectTo }: LoginProps) => Promise<void>
  isLoading: boolean
  error: string | Error | null
}

export function useLogin(): useLoginType {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<Error | string | null>(null)
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from: string = location.state?.from?.pathname || routes.DASHBOARD

  const login = useCallback(
    async function ({
      email,
      password,
      redirectTo = routes.DASHBOARD,
    }: LoginProps) {
      setLoading(true)

      try {
        await signInWithEmailAndPassword(auth, email, password)

        toast({
          title: 'You are logged in',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'cyan',
          variant: 'solid',
        })
        navigate(from.length > 0 ? from : redirectTo, { replace: true })
      } catch (error: any) {
        if (error instanceof Error) {
          toast({
            title: 'Logging in failed',
            description: error.message,
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            variant: 'solid',
          })
          setError(error)
        }
        const errorCode = error?.code?.toString() as string
        const errorMessage = firebaseErrorMap.get(errorCode)
        console.error(error?.code?.toString())

        toast({
          title: 'Logging in failed',
          description: errorMessage,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
          variant: 'solid',
        })
        setError(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    },
    [from, navigate, toast]
  )

  return { login, isLoading, error }
}

interface UseRegisterType {
  register: (props: {
    email: string
    password: string
    redirectTo?: string
  }) => Promise<void>
  isLoading: boolean
  error: Error | string | null
}

export function useRegister(): UseRegisterType {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<Error | string | null>(null)
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location?.state?.from?.pathname as string) ?? routes.DASHBOARD

  interface RegisterProps {
    email: string
    password: string
    redirectTo?: string
  }

  const register = useCallback(
    async function ({
      email,
      password,
      redirectTo = routes.DASHBOARD,
    }: RegisterProps) {
      setLoading(true)

      try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const ref = doc(db, COLLECTIONS.USERS, `${res.user.uid}`)
        const docSnap = await getDoc(ref)
        if (docSnap.data()?.avatar != null) {
          storeActions.setAvatar(docSnap.data()?.avatar)
        } else {
          storeActions.setAvatar('')
        }
        if (res.user.uid.length > 0) storeActions.setUserId(res.user.uid)
        if (res.user.email != null) storeActions.setUserEmail(res.user.email)
        store.isSignedIn = true

        await setDoc(doc(db, COLLECTIONS.USERS, res.user.uid), {
          id: res.user.uid,
          email: res.user.email,
          avatar: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          displayName: '',
          role: 'user',
          isAdmin: false,
          pto: 0,
        })

        toast({
          title: 'Account created',
          description: 'You are logged in',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
          variant: 'solid',
          colorScheme: 'cyan',
        })
        if (from.length > 0) navigate(from)
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error)
        } else if (typeof error === 'string') {
          setError(error)
        } else {
          const errorCode = error?.code.toString() as string

          const errorMessage = firebaseErrorMap.get(errorCode)

          toast({
            title: 'Sign Up failed',
            description: errorMessage ?? error.message,
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            variant: 'solid',
          })
          setError(error)
        }
      } finally {
        setLoading(false)
      }
    },
    [from, navigate, toast]
  )

  return { register, isLoading, error }
}

interface UseLogoutType {
  logout: () => Promise<void>
  isLoading: boolean
  error: Error | AuthError | undefined
}

export function useLogout(): UseLogoutType {
  const [signOut, isLoading, error] = useSignOut(auth)
  const toast = useToast()
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    if (await signOut()) {
      toast({
        title: 'Successfully logged out',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'cyan',
        variant: 'solid',
      })
      navigate(routes.LOGIN)
    } else {
      toast({
        title: 'Logging out failed',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
    }
  }, [signOut, toast, navigate])

  return { logout, isLoading, error }
}

// import { getAuth, sendEmailVerification } from 'firebase/auth'

// const auth = getAuth()
// sendEmailVerification(auth.currentUser).then(() => {
//   // Email verification sent!
//   // ...
// })

// import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

// const auth = getAuth()
// sendPasswordResetEmail(auth, email)
//   .then(() => {
//     // Password reset email sent!
//     // ..
//   })
//   .catch((error) => {
//     const errorCode = error.code
//     const errorMessage = error.message
//     // ..
//   })

// import { getAuth, updateEmail } from 'firebase/auth'
// const auth = getAuth()
// updateEmail(auth.currentUser, 'user@example.com')
//   .then(() => {
//     // Email updated!
//     // ...
//   })
//   .catch((error) => {
//     // An error occurred
//     // ...
//   })
