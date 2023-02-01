import { PaysheetType } from '@/data/paySchema'
import { db } from '@/firebase'
import { routes } from '@/layout/routes'
import { COLLECTIONS } from '@/lib/constants'
import { useStore } from '@/stores/store'
import { useToast } from '@chakra-ui/react'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useAddPay() {
  const [isPayLoading, setLoading] = useState(false)
  const [payError, setPayError] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()
  const snap = useStore()

  const addPay = useCallback(
    async function addPay({
      date,
      startingMiles,
      endingMiles,
      totalMiles,
      payMiles,
      backhaul,
      delayHours,
    }: PaysheetType) {
      setLoading(true)

      if (!snap?.userId) {
        toast({
          title: 'You must be logged in to add pay',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'teal',
          variant: 'solid',
        })
        return false
      }
      const q = query(
        collection(
          db,
          COLLECTIONS.USERS,
          `${snap?.userId}`,
          COLLECTIONS.PAYSHEETS
        ),
        where('date', '==', date)
      )
      const querySnapshot = await getDocs(q)

      if (querySnapshot.size > 0) {
        const docId = querySnapshot.docs[0].id
        const docRef = doc(
          db,
          COLLECTIONS.USERS,
          `${snap?.userId}`,
          COLLECTIONS.PAYSHEETS,
          docId
        )

        try {
          await updateDoc(docRef, {
            date,
            uid: snap?.userId,
            startingMiles,
            endingMiles,
            totalMiles,
            payMiles,
            backhaul,
            delayHours,
          })
          toast({
            title: 'Pay updated',
            status: 'success',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'teal',
            variant: 'solid',
          })
          navigate(routes.DASHBOARD)
        } catch (error: any) {
          toast({
            title: 'Updating pay failed',
            description: error.message,
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'pink.500',
            variant: 'solid',
          })
          setPayError(error)
        }
        return true
      } else {
        try {
          await addDoc(
            collection(
              db,
              COLLECTIONS.USERS,
              `${snap?.userId}`,
              COLLECTIONS.PAYSHEETS
            ),
            {
              date,
              uid: snap?.userId,
              startingMiles,
              endingMiles,
              totalMiles,
              payMiles,
              backhaul,
              delayHours,
            }
          )
          toast({
            title: 'Pay added',
            status: 'success',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'teal',
            variant: 'solid',
          })
          navigate(routes.DASHBOARD)
        } catch (error: any) {
          toast({
            title: 'Adding pay failed',
            description: error.message,
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'pink.500',
            variant: 'solid',
          })
          setPayError(error)
        } finally {
          setLoading(false)
        }
      }
    },
    [snap?.userId, toast, navigate]
  )

  return { addPay, isPayLoading, payError }
}
