import { getWeeklyTotals } from '@/lib/utils'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { useEffect } from 'react'
import { collection, orderBy, query } from 'firebase/firestore'

import { db } from '@/firebase'
import { COLLECTIONS, returnPaysheetString } from '@/lib/constants'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

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
      orderBy('date', 'asc')
    )
  }

  const [totals, totalsLoading, totalsError]: any = useCollectionOnce(q)
  let weeks = []
  useEffect(() => {
    if (!totalsLoading && snap?.isSignedIn) {
      const sheets = totals.docs.map((doc) => doc.data())
      weeks = getWeeklyTotals(sheets)

      weeks.sort((a, b) => b.weekStart - a.weekStart)

      store.weeks = weeks
    }
  }, [totalsLoading])

  return { weeks, totals, totalsLoading, totalsError }
}
