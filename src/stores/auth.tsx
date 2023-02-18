import { auth, db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { getWeeklyTotals } from '@/lib/utils'
import {
  onAuthStateChanged,
  signOut as authSignOut,
  type NextOrObserver,
  type User,
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
import { storeActions, type PaysheetType, type WeeksType } from './store'

interface UseFirebaseAuthReturnType {
  authUser: {
    uid: string
    email: string
  } | null
  isLoading: boolean
  isSignedIn: boolean
  signOut: () => Promise<void>
}

function useFirebaseAuth(): UseFirebaseAuthReturnType {
  const [authUser, setAuthUser] = useState<{
    uid: string
    email: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  const clear: () => void = () => {
    setAuthUser(null)
    setIsLoading(false)
    setIsSignedIn(false)
    storeActions.clear()
  }

  const authStateChanged: NextOrObserver<User> | null = useCallback(
    async (user: User | null) => {
      setIsLoading(true)
      if (user == null) {
        clear()
        return
      }

      if (user.isAnonymous) {
        clear()
        return
      }

      if (user.email != null) {
        setAuthUser({
          uid: user.uid,
          email: user.email,
        })
        storeActions.setUserEmail(user.email)
      }
      if (user.displayName != null)
        storeActions.setDisplayName(user.displayName)

      const ref = doc(db, 'users', `${user.uid}`)
      const docSnap = await getDoc(ref)
      storeActions.setAvatar(docSnap.data()?.avatar ?? user.photoURL)
      storeActions.setIsSignedIn(true)
      storeActions.setUserId(user.uid)
      storeActions.setPto(docSnap.data()?.pto ?? 0)
      if (user?.email != null) setIsSignedIn(user !== null)
      setIsLoading(false)
    },
    []
  )

  /**
   * Get paysheets from firestore and put into global store
   */
  useEffect(() => {
    if (!isSignedIn) return
    if (authUser === null || authUser === undefined) return
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
          startingMiles: doc.data()?.startingMiles as number,
          endingMiles: doc.data()?.endingMiles as number,
          date: doc.data()?.date as number,
          totalMiles: doc.data()?.totalMiles as number,
          payMiles: doc.data()?.payMiles as number,
          backhaul: doc.data()?.backhaul as number,
          delayHours: doc.data()?.delayHours as number,
          delayPay: doc.data()?.delayPay as number,
        }))
        storeActions.setPaysheets(data)
        const weeks: WeeksType[] = getWeeklyTotals(data)
        storeActions.setWeeks(weeks)
      })
      return () => {
        unsubscribe()
      }
    }
  }, [isSignedIn, authUser])

  // Sign out
  const signOut = useCallback(async () => {
    await authSignOut(auth).then(clear)
  }, [])

  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged)
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    authUser,
    isLoading,
    isSignedIn,
    signOut,
  }
}

const AuthUserContext = createContext<UseFirebaseAuthReturnType>({
  authUser: {
    uid: '',
    email: '',
  },
  isLoading: true,
  isSignedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: async () => {},
})

export function AuthUserProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const auth = useFirebaseAuth()
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  )
}

type UseFireAuthReturnType = () => {
  authUser: { uid: string; email: string } | null | undefined
  isLoading: boolean
  isSignedIn: boolean
  signOut: () => Promise<void>
}

export const useFireAuth: UseFireAuthReturnType = () =>
  useContext(AuthUserContext)
