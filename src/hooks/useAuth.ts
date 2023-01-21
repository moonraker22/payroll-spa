import { auth, db } from '@/firebase'
import { firebaseErrorMap } from '@/lib/constants'
import { routes } from '@/lib/routes'
import { store, storeActions, useStore } from '@/stores/store'
import { useToast } from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { COLLECTIONS } from '../lib/constants'

export function useAuth() {
  // const [authUser, authLoading, error] = useAuthState(auth)
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState<DocumentData | undefined | null>(null)
  const snap = useStore()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const ref = doc(db, 'users', `${snap ? snap.userId : ''}`)
      const docSnap = await getDoc(ref)
      setUser(docSnap.data())
      // store.avatar = docSnap.data()?.avatar
      setLoading(false)
    }

    if (snap) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [snap])

  return { user, isLoading }
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  type LoginProps = {
    email: string
    password: string
    redirectTo?: string
  }

  async function login({
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
      navigate(from || redirectTo, { replace: true })
    } catch (error: any) {
      const errorMessage = firebaseErrorMap.get(`${error.code.toString()}`)
      console.log(error.code.toString())

      toast({
        title: 'Logging in failed',
        description: errorMessage || error.message,
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
  }

  return { login, isLoading, error }
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  type RegisterProps = {
    email: string
    password: string
    redirectTo?: string
  }

  async function register({
    email,
    password,
    redirectTo = routes.DASHBOARD,
  }: RegisterProps) {
    setLoading(true)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const ref = doc(db, COLLECTIONS.USERS, `${res.user.uid}`)
      const docSnap = await getDoc(ref)
      storeActions.setAvatar(docSnap.data()?.avatar || '')
      if (res.user.uid) storeActions.setUserId(res.user.uid)
      if (res.user.email) storeActions.setUserEmail(res.user.email)
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

      navigate(from || redirectTo, { replace: true })
    } catch (error: any) {
      const errorMessage = firebaseErrorMap.get(`${error.code.toString()}`)

      toast({
        title: 'Sign Up failed',
        description: errorMessage || error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { register, isLoading, error }
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth)
  const toast = useToast()
  const navigate = useNavigate()

  async function logout() {
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
    } // else: show error [signOut() returns false if failed]
  }

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
