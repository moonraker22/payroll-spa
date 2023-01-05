import {
  startOfWeek,
  endOfWeek,
  toDate,
  isEqual,
  getWeeklyTotals,
} from '@/lib/utils'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { useEffect, useRef, useState } from 'react'
import { collection, query, getDocs } from 'firebase/firestore'

import { db } from '@/firebaseConf'
import { COLLECTIONS, returnPaysheetString } from '@/lib/constants'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

export function useGetWeeklyTotals() {
  // const [totals, setTotals]: any = useState([])
  const snap = useSnapshot(store)
  //   const [payState, setPayState]: any = useState([])
  // const [totalsLoading, setTotalsLoading] = useState(false)
  // const [totalsError, setTotalsError] = useState(null)

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

  // useEffect(() => {
  //   if (snap.paysheets.length > 0) {
  //     const test = getWeeklyTotals(snap.paysheets)
  //     store.weeks = test
  //   }
  // }, [snap.paysheets])

  // const runOnce = useRef(false)
  // useEffect(() => {
  //   async function getTotals() {
  //     if (runOnce.current === false) {
  //       setTotalsLoading(true)
  //       try {
  //         const querySnapshot = await getDocs(q)
  //         querySnapshot.forEach((doc) => {
  //           // store.paysheets.push(doc.data())
  //           const temp = doc.data()
  // console.log(temp, 'temp')

  // temp.id = doc.id
  //           setTotals((prev: any) => [...prev, temp])
  //           setTotals((prev: any) => {
  //             const test = getWeeklyTotals(prev)
  //             return test
  //           })
  //         })
  //         setTotalsLoading(false)
  //       } catch (error) {
  //         setTotalsError(error)
  //       }
  //     }
  //     return true
  //   }
  //   getTotals()

  //   return () => {
  //     runOnce.current = true
  //   }
  // }, [])

  return { totals, totalsLoading, totalsError }
}
