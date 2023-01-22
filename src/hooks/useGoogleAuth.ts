import { auth, db, googleProvider } from '@/firebase'
import { routes } from '@/layout/routes'
import { storeActions } from '@/stores/store'
import { useToast } from '@chakra-ui/react'
import { getRedirectResult, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
            updatedAt: serverTimestamp(),
            role: 'user',
            isAdmin: false,
          }
          const userRef = doc(db, 'users', user?.uid)
          await setDoc(userRef, data)

          if (user?.photoURL) storeActions.setAvatar(user?.photoURL)
          storeActions.setIsSignedIn(true)
          if (user?.email) storeActions.setUserEmail(user?.email)
        } else {
          storeActions.setAvatar(snapshot.data()?.avatar)
          storeActions.setIsSignedIn(true)
          storeActions.setUserEmail(snapshot.data()?.email)
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
    } catch (error: any) {
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
