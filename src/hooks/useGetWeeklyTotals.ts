import { getWeeklyTotals } from '@/lib/utils'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { useEffect } from 'react'
import { collection, query } from 'firebase/firestore'

import { db, auth } from '@/firebaseConf'
import { COLLECTIONS, returnPaysheetString } from '@/lib/constants'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { useAuth } from './useAuth'
import { useAuthState } from 'react-firebase-hooks/auth'

export function useGetWeeklyTotals() {
  const snap = useSnapshot(store)
  // const { user } = useAuth()
  const [authUser, authLoading, authError] = useAuthState(auth)

  let q
  if (!authLoading) {
    q = query(
      collection(db, `users`, `${authUser.uid}`, `${COLLECTIONS.PAYSHEETS}`)
    )
  }

  const [totals, totalsLoading, totalsError]: any = useCollectionOnce(q)
  let weeks = []
  useEffect(() => {
    if (!totalsLoading && !authLoading) {
      const sheets = totals.docs.map((doc) => doc.data())
      weeks = getWeeklyTotals(sheets)
      store.weeks = weeks
    }
  }, [totalsLoading])

  return { weeks, totals, totalsLoading, totalsError }
}
