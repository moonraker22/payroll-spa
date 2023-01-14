import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '@/firebase'
import { addDays, addWeeks } from 'date-fns'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { COLLECTIONS } from '@/lib/constants'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'

export function useGetWeekData({ weekStart }) {
  const snap = useSnapshot(store)
  const weekEnd = addWeeks(weekStart, 1).toISOString()

  const q = query(
    collection(db, `users`, `${snap?.userId}`, `${COLLECTIONS.PAYSHEETS}`),
    where('date', '>=', weekStart),
    where('date', '<=', Date.parse(weekEnd)),
    orderBy('date', 'desc')
  )

  const [weekData, loading, error, snapshot] = useCollectionData(q, {})

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
