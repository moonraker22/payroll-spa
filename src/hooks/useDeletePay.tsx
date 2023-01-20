import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { store, useSnapshot } from '@/stores/store'
import { deleteDoc, doc } from 'firebase/firestore'

export const useDeletePay = () => {
  const snap = useSnapshot(store)

  const deletePay = async (docId: string) => {
    await deleteDoc(
      doc(
        db,
        COLLECTIONS.USERS,
        `${snap?.userId}`,
        COLLECTIONS.PAYSHEETS,
        docId
      )
    )
  }

  return { deletePay }
}
