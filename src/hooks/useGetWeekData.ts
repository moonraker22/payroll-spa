import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { useStore, type PaysheetType } from '@/stores/store'
import { addWeeks } from 'date-fns'
import {
  collection,
  orderBy,
  query,
  where,
  type DocumentData,
  type FirestoreError,
} from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

interface UseGetWeekDataType {
  weekData: PaysheetType[]
  loading: boolean
  error: FirestoreError | undefined
}

export function useGetWeekData(): UseGetWeekDataType {
  const snap = useStore()

  type Snap = typeof snap.weekData.startDate
  const startDate: Snap = snap?.weekData.startDate as Date

  const weekEnd = addWeeks(new Date(startDate), 1).toISOString()

  const q = query(
    collection(
      db,
      `users`,
      `${snap.userId.length > 0 ? snap.userId : 'empty'}`,
      `${COLLECTIONS.PAYSHEETS}`
    ),
    where('date', '>=', new Date(startDate).getTime()),
    where('date', '<=', Date.parse(weekEnd)),
    orderBy('date', 'asc')
  )

  const [data, loading, error] = useCollectionData(q)

  // function isPaysheetType(item: DocumentData): item is PaysheetType {
  //   return (
  //     typeof item?.uid === 'string' &&
  //     typeof item?.date === 'number' &&
  //     typeof item?.backhaul === 'number' &&
  //     typeof item?.delayHours === 'number' &&
  //     typeof item?.delayPay === 'number' &&
  //     typeof item?.endingMiles === 'number' &&
  //     typeof item?.payMiles === 'number' &&
  //     typeof item?.startingMiles === 'number' &&
  //     typeof item?.totalMiles === 'number'
  //   )
  // }

  // Function to parse the data and return the correct type
  const parseData = (data: DocumentData[] | undefined): PaysheetType[] => {
    if (data == null) {
      return []
    }
    // if (data.every(isPaysheetType)) {
    const weekData: PaysheetType[] = data.map((item: DocumentData) => {
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
    return weekData
    // } else {
    //   return []
    // }
  }

  if (data != null) {
    return { weekData: parseData(data), error, loading }
  } else {
    return { weekData: [], error, loading }
  }
}

// export type DayType = {
//   date: Date
//   backhaul: number
//   endingMiles: number
//   payMiles: number
//   startingMiles: number
//   totalMiles: number
// }
