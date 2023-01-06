import { getWeeklyTotals } from '@/lib/utils'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { useEffect } from 'react'
import { collection, query } from 'firebase/firestore'

import { db } from '@/firebaseConf'
import { COLLECTIONS, returnPaysheetString } from '@/lib/constants'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

export function useGetWeeklyTotals() {
  const snap = useSnapshot(store)

  const q = query(
    collection(db, `users`, `${snap?.userId}`, `${COLLECTIONS.PAYSHEETS}`)
  )

  const [totals, totalsLoading, totalsError]: any = useCollectionOnce(q)

  useEffect(() => {
    if (!totalsLoading) {
      const sheets = totals.docs.map((doc) => doc.data())
      const test = getWeeklyTotals(sheets)
      store.weeks = test
    }
  }, [totalsLoading])

  return { totals, totalsLoading, totalsError }
}
