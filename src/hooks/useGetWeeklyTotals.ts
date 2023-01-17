import { getWeeklyTotals } from '@/lib/utils'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { useEffect } from 'react'
import { collection, orderBy, query } from 'firebase/firestore'

import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { useCollectionData } from 'react-firebase-hooks/firestore'

export function useGetWeeklyTotals() {
  const snap = useSnapshot(store)

  let q
  if (snap?.isSignedIn && snap?.userId) {
    q = query(
      collection(
        db,
        COLLECTIONS.USERS,
        `${snap?.userId}`,
        `${COLLECTIONS.PAYSHEETS}`
      ),
      orderBy('date', 'desc')
    )
  }

  const [totals, totalsLoading, totalsError]: any = useCollectionData(q)

  let weeks = []
  useEffect(() => {
    if (!totalsLoading && snap?.isSignedIn) {
      store.paysheets = totals
      weeks = getWeeklyTotals(totals)

      store.weeks = weeks
    }
  }, [totalsLoading])

  return { weeks, totals, totalsLoading, totalsError }
}
