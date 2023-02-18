import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { useStore } from '@/stores/store'
import { deleteDoc, doc } from 'firebase/firestore'
import { useCallback } from 'react'

export const useDeletePay = () => {
  const snap = useStore()

  const deletePay = useCallback(
    async (docId: string) => {
      await deleteDoc(
        doc(
          db,
          COLLECTIONS.USERS,
          `${snap?.userId}`,
          COLLECTIONS.PAYSHEETS,
          docId
        )
      )
    },
    [snap?.userId]
  )

  return { deletePay }
}
