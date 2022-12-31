import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { useAuthState, useSignOut, useIdToken } from 'react-firebase-hooks/auth'
import { auth, db } from '@/firebaseConf'
import { useEffect, useState } from 'react'
import { routes } from '@/lib/routes'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { setDoc, doc, getDoc } from 'firebase/firestore'

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth)
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const ref = doc(db, 'users', authUser.uid)
      const docSnap = await getDoc(ref)
      setUser(docSnap.data())
      setLoading(false)
    }

    if (!authLoading) {
      if (authUser) fetchData()
      else setLoading(false) // Not signed in
    }
  }, [authLoading])

  return { user, isLoading, error }
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()

  async function login({ email, password, redirectTo = routes.HOME }) {
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({
        title: 'You are logged in',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'teal',
        variant: 'solid',
      })
      navigate(redirectTo)
    } catch (error) {
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

  async function register({ email, password, redirectTo = routes.HOME }) {
    setLoading(true)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, 'users', res.user.uid), {
        id: res.user.uid,
        email: res.user.email,
        avatar: '',
        date: Date.now(),
      })

      toast({
        title: 'Account created',
        description: 'You are logged in',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })

      navigate(redirectTo)
    } catch (error) {
      toast({
        title: 'Sign Up failed',
        description: error.message,
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
        colorScheme: 'teal',
        variant: 'solid',
      })
      navigate(routes.LOGIN)
    } // else: show error [signOut() returns false if failed]
  }

  return { logout, isLoading, error }
}
