import { auth, db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { getWeeklyTotals } from '@/lib/utils'
import { onAuthStateChanged, signOut as authSignOut, User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { PaysheetType, storeActions } from './store'

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<{
    uid: string
    email: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  const clear = () => {
    setAuthUser(null)
    setIsLoading(false)
    setIsSignedIn(false)
    storeActions.clear()
  }

  const authStateChanged: any = async (user: User) => {
    setIsLoading(true)
    if (!user) {
      clear()
      return
    }

    if (user.isAnonymous) {
      clear()
      return
    }

    if (user.email)
      setAuthUser({
        uid: user.uid,
        email: user.email,
      })

    const ref = doc(db, 'users', `${user.uid}`)
    const docSnap = await getDoc(ref)
    storeActions.setAvatar(docSnap.data()?.avatar || user.photoURL)
    storeActions.setIsSignedIn(true)
    storeActions.setUserId(user.uid)
    if (user?.email) storeActions.setUserEmail(user.email)
    setIsSignedIn(user !== null)
    setIsLoading(false)
  }

  /**
   * Get paysheets from firestore and put into global store
   */
  useEffect(() => {
    if (!isSignedIn) return
    if (authUser === null) return
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
        storeActions.setPaysheets(data)
        const weeks = getWeeklyTotals(data)
        storeActions.setWeeks(weeks)
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
  authUser: null as any,
  isLoading: true,
  isSignedIn: false,
  signOut: async () => {},
})

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const auth = useFirebaseAuth()
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  )
}

export const useFireAuth = () => useContext(AuthUserContext)
