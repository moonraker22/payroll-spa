import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { store } from './store'
import { doc, getDoc } from 'firebase/firestore'

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  const clear = () => {
    setAuthUser(null)
    setIsLoading(false)
    // setError(null)
    setIsSignedIn(false)
    store.userId = null
    store.avatar = ''
    store.userEmail = ''
    store.isSignedIn = false
  }

  const authStateChanged = async (user) => {
    setIsLoading(true)
    if (!user) {
      clear()
      return
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
    })

    const ref = doc(db, 'users', `${user.uid}`)
    const docSnap = await getDoc(ref)
    store.avatar = docSnap.data()?.avatar || user.photoURL
    store.isSignedIn = true
    store.userId = user.uid
    store.userEmail = user.email
    setIsSignedIn(user)
    setIsLoading(false)
  }

  const signOut = () => authSignOut(auth).then(clear)

  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    isLoading,
    isSignedIn,
    signOut,
  }
}

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
  isSignedIn: false,
  signOut: async () => {},
})

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth()
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  )
}

export const useFireAuth = () => useContext(AuthUserContext)
