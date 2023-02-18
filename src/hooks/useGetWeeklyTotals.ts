import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { getWeeklyTotals } from '@/lib/utils'
import {
  storeActions,
  useStore,
  type PaysheetType,
  type WeeksType,
} from '@/stores/store'
import {
  collection,
  orderBy,
  query,
  type DocumentData,
  type FirestoreError,
} from 'firebase/firestore'
import { useEffect, useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

interface UseGetWeeklyTotalsType {
  weeks: WeeksType[]
  totals: PaysheetType[]
  totalsLoading: boolean
  totalsError: FirestoreError | undefined
}
export function useGetWeeklyTotals(): UseGetWeeklyTotalsType {
  const snap = useStore()

  let q
  if (snap.isSignedIn && snap.userId.length > 0) {
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

  const [totalsFromDb, totalsLoading, totalsError] = useCollectionData(q)

  // Function to parse the data and return the correct type
  const parseData = (data: DocumentData[] | undefined): PaysheetType[] => {
    if (data == null) {
      return []
    }
    const totals: PaysheetType[] = data.map((item: DocumentData) => {
      return {
        uid: (item?.uid as string) ?? '',
        date: (item?.date as number) ?? 0,
        backhaul: (item?.backhaul as number) ?? 0,
        delayHours: (item?.delayHours as number) ?? 0,
        delayPay: (item?.delayPay as number) ?? 0,
        endingMiles: (item?.endingMiles as number) ?? 0,
        payMiles: (item?.payMiles as number) ?? 0,
        startingMiles: (item?.startingMiles as number) ?? 0,
        totalMiles: (item?.totalMiles as number) ?? 0,
      }
    })
    return totals
  }

  let totals: PaysheetType[] = []
  let weeks: WeeksType[] = []
  useEffect(() => {
    if (!totalsLoading && snap?.isSignedIn) {
      if (totalsFromDb != null) {
        totals = parseData(totalsFromDb)
        storeActions.setPaysheets(totals)

        weeks = useMemo(() => getWeeklyTotals(totals), [totals])

        storeActions.setWeeks(weeks)
      }
    }
  }, [totalsLoading])

  return { weeks, totals, totalsLoading, totalsError }
}
