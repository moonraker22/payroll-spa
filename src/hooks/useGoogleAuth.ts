import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/lib/routes'
import { db, googleProvider, auth } from '@/firebase'
import { getRedirectResult, signInWithPopup } from 'firebase/auth'
import { store } from '@/stores/store'

import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()

  async function googleLogin() {
    setIsLoading(true)

    try {
      const res = await signInWithPopup(auth, googleProvider)
      const result = await getRedirectResult(auth)
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken
      const user = res?.user

      if (user) {
        const snapshot = await getDoc(doc(db, 'users', user?.uid))

        if (!snapshot.exists()) {
          const data = {
            id: user?.uid,
            displayName: user?.displayName,
            email: user?.email,
            avatar: user?.photoURL,
            createdAt: serverTimestamp(),
            role: 'user',
            isAdmin: false,
          }
          const userRef = doc(db, 'users', user?.uid)
          await setDoc(userRef, data)

          store.avatar = user?.photoURL
          store.isSignedIn = true
          store.userEmail = user?.email
        } else {
          store.avatar = snapshot.data()?.avatar
          store.isSignedIn = true
          store.userEmail = snapshot.data()?.email
          store.avatar = snapshot.data()?.avatar
        }
      }

      toast({
        title: 'Successfully logged in',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
        colorScheme: 'cyan',
      })

      navigate(`${routes.DASHBOARD}`)
    } catch (error) {
      console.log('error', error)
      toast({
        title: 'Sign In failed',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { googleLogin, isLoading, error }
}
