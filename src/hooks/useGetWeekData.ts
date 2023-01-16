import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '@/firebase'
import {
  addDays,
  addWeeks,
  differenceInDays,
  isAfter,
  isBefore,
  isEqual,
  isWithinInterval,
} from 'date-fns'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { COLLECTIONS } from '@/lib/constants'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'

export function useGetWeekData({ weekStart }) {
  const snap = useSnapshot(store)

  const weekEnd = addWeeks(weekStart, 1).toISOString()
  // const [week, setWeek] = useState(null)

  // const sheets = snap.paysheets

  // useEffect(() => {
  //   if (snap?.isSignedIn && snap?.userId) {
  //     const weekData = sheets.filter((sheet) => {
  //       return isWithinInterval(new Date(sheet.date), {
  //         start: weekStart,
  //         end: new Date(weekEnd),
  //       })
  //     })

  //     setWeek(weekData)
  //   }
  // }, [snap?.isSignedIn, snap?.userId, sheets])
  /**
   * TODO IF STATE IS UNDEFINED AND NOT PASSED TO WEEKSTART ON RELOAD ERROR OCCURS AND PAGE DOES NOT RENDER
   * FIREBASE ERROR users/paysheets is not a valid collection reference.
   */

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
  // return { week }
}

export type DayType = {
  date: Date
  backhaul: number
  endingMiles: number
  payMiles: number
  startingMiles: number
  totalMiles: number
}
