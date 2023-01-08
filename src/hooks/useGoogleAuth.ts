import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/lib/routes'
import { db, googleProvider, auth } from '@/firebaseConf'
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
} from 'firebase/auth'
import { store } from '@/stores/store'
import { useSnapshot } from 'valtio'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

// const auth = getAuth()
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result)
//     const token = credential.accessToken
//     // The signed-in user info.
//     const user = result.user
//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code
//     const errorMessage = error.message
//     // The email of the user's account used.
//     const email = error.customData.email
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error)
//     // ...
//   })

// import { getAuth, signInWithRedirect } from 'firebase/auth'

// const auth = getAuth()
// signInWithRedirect(auth, provider)

// import { getAuth, getRedirectResult, GoogleAuthProvider } from 'firebase/auth'

// const auth = getAuth()
// getRedirectResult(auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result)
//     const token = credential.accessToken

//     // The signed-in user info.
//     const user = result.user
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code
//     const errorMessage = error.message
//     // The email of the user's account used.
//     const email = error.customData.email
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error)
//     // ...
//   })
// import { getAuth, signOut } from 'firebase/auth'

// const auth = getAuth()
// signOut(auth)
//   .then(() => {
//     // Sign-out successful.
//   })
//   .catch((error) => {
//     // An error happened.
//   })

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()
  // const [authUser, authLoading, Autherror] = useAuthState(auth)

  // const auth = getAuth()
  // const provider = new GoogleAuthProvider()

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
            createdAt: new Date(),
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
