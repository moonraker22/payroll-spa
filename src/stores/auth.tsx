import { auth, db } from '@/firebase'
import { getWeeklyTotals } from '@/lib/utils'
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { COLLECTIONS } from '../lib/constants'
import { PaysheetType, store } from './store'

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

  /**
   * Get paysheets from firestore and put into global store
   */
  useEffect(() => {
    if (!isSignedIn) return
    if (authUser.uid !== null) {
      const q = query(
        collection(
          db,
          COLLECTIONS.USERS,
          `${authUser.uid}`,
          `${COLLECTIONS.PAYSHEETS}`
        ),
        orderBy('date', 'desc')
      )

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: PaysheetType[] = querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          startingMiles: doc.data().startingMiles,
          endingMiles: doc.data().endingMiles,
          date: doc.data().date,
          totalMiles: doc.data().totalMiles,
          payMiles: doc.data().payMiles,
          backhaul: doc.data().backhaul,
        }))
        store.paysheets = data
        const weeks = getWeeklyTotals(data)
        store.weeks = weeks
      })
      return () => unsubscribe()
    }
  }, [isSignedIn, authUser])

  // Sign out
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
