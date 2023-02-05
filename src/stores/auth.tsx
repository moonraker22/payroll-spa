import { auth, db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { getWeeklyTotals } from '@/lib/utils'
import {
  NextOrObserver,
  onAuthStateChanged,
  signOut as authSignOut,
  User,
} from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { PaysheetType, storeActions, WeeksType } from './store'

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

  const authStateChanged: NextOrObserver<User> | null = useCallback(
    async (user: User | null) => {
      setIsLoading(true)
      if (!user) {
        clear()
        return
      }

      if (user.isAnonymous) {
        clear()
        return
      }

      if (user.email) {
        setAuthUser({
          uid: user.uid,
          email: user.email,
        })
        storeActions.setUserEmail(user.email)
      }
      if (user.displayName) storeActions.setDisplayName(user.displayName)

      const ref = doc(db, 'users', `${user.uid}`)
      const docSnap = await getDoc(ref)
      storeActions.setAvatar(docSnap.data()?.avatar || user.photoURL)
      storeActions.setIsSignedIn(true)
      storeActions.setUserId(user.uid)
      storeActions.setPto(docSnap.data()?.pto || 0)
      if (user?.email) setIsSignedIn(user !== null)
      setIsLoading(false)
    },
    []
  )

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
          uid: doc?.id,
          startingMiles: doc.data()?.startingMiles,
          endingMiles: doc.data()?.endingMiles,
          date: doc.data()?.date,
          totalMiles: doc.data()?.totalMiles,
          payMiles: doc.data()?.payMiles,
          backhaul: doc.data()?.backhaul,
          delayHours: doc.data()?.delayHours,
          delayPay: doc.data()?.delayPay,
        }))
        storeActions.setPaysheets(data)
        const weeks: WeeksType[] = getWeeklyTotals(data)
        storeActions.setWeeks(weeks)
      })
      return () => unsubscribe()
    }
  }, [isSignedIn, authUser])

  // Sign out
  const signOut = useCallback(() => authSignOut(auth).then(clear), [])

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
