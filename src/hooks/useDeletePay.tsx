import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { useStore } from '@/stores/store'
import { deleteDoc, doc } from 'firebase/firestore'

export const useDeletePay = () => {
  const snap = useStore()

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
