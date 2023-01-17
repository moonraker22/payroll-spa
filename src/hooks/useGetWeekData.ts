import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '@/firebase'
import { addWeeks } from 'date-fns'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { COLLECTIONS } from '@/lib/constants'

export function useGetWeekData({ weekStart }) {
  const snap = useSnapshot(store)

  const weekEnd = addWeeks(weekStart, 1).toISOString()

  const q = query(
    collection(
      db,
      `users`,
      `${snap?.userId || 'empty'}`,
      `${COLLECTIONS.PAYSHEETS}`
    ),
    where('date', '>=', weekStart),
    where('date', '<=', Date.parse(weekEnd)),
    orderBy('date', 'desc')
  )

  const [weekData, loading, error] = useCollectionData(q)

  return { weekData, error, loading }
}

export type DayType = {
  date: Date
  backhaul: number
  endingMiles: number
  payMiles: number
  startingMiles: number
  totalMiles: number
}
