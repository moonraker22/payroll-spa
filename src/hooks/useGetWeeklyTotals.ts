import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { getWeeklyTotals } from '@/lib/utils'
import { storeActions, useStore, WeeksType } from '@/stores/store'
import { collection, orderBy, query } from 'firebase/firestore'
import { useEffect, useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

export function useGetWeeklyTotals() {
  const snap = useStore()

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

  let weeks: WeeksType[] = []
  useEffect(() => {
    if (!totalsLoading && snap?.isSignedIn) {
      storeActions.setPaysheets(totals)
      // weeks = getWeeklyTotals(totals)

      weeks = useMemo(() => getWeeklyTotals(totals), [totals])

      storeActions.setWeeks(weeks)
    }
  }, [totalsLoading])

  return { weeks, totals, totalsLoading, totalsError }
}
