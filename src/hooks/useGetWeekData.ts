import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { useStore } from '@/stores/store'
import { addWeeks } from 'date-fns'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

export function useGetWeekData() {
  const snap = useStore()
  const startDate: any = snap?.weekData.startDate
  const weekEnd = addWeeks(new Date(startDate), 1).toISOString()

  const q = query(
    collection(
      db,
      `users`,
      `${snap?.userId || 'empty'}`,
      `${COLLECTIONS.PAYSHEETS}`
    ),
    where('date', '>=', new Date(startDate).getTime()),
    where('date', '<=', Date.parse(weekEnd)),
    orderBy('date', 'asc')
  )

  const [weekData, loading, error] = useCollectionData(q)

  return { weekData, error, loading }
}

// export type DayType = {
//   date: Date
//   backhaul: number
//   endingMiles: number
//   payMiles: number
//   startingMiles: number
//   totalMiles: number
// }
