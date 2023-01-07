import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { auth, db } from '@/firebaseConf'
import { useEffect, useState } from 'react'
import { routes } from '@/lib/routes'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { useUserData } from './useAuth'
import { store } from '@/stores/store'
import { useSnapshot } from 'valtio'

export function useAddPay() {
  const [isPayLoading, setLoading] = useState(false)
  const [payError, setPayError] = useState(null)
  const toast = useToast()
  const navigate = useNavigate()
  // const { user, isLoading } = useAuth()
  const snap = useSnapshot(store)

  async function addPay({
    date,
    startingMiles,
    endingMiles,
    totalMiles,
    payMiles,
    backhaul,
  }) {
    setLoading(true)

    if (!snap.userId) {
      toast({
        title: 'You must be logged in to add pay',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'pink.500',
        variant: 'solid',
      })
      return false
    }
    const q = query(
      collection(db, `users`, `${snap.userId}`, 'paysheets'),
      where('date', '==', date)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.size > 0) {
      const docId = querySnapshot.docs[0].id
      const docRef = doc(db, `users`, `${snap.userId}`, 'paysheets', docId)

      try {
        await updateDoc(docRef, {
          date,
          uid: snap.userId,
          startingMiles,
          endingMiles,
          totalMiles,
          payMiles,
          backhaul,
        })
        toast({
          title: 'Pay updated',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'cyan',
          variant: 'solid',
        })
        navigate(routes.DASHBOARD)
      } catch (error) {
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
        await addDoc(collection(db, `users`, `${snap.userId}`, 'paysheets'), {
          date,
          uid: snap.userId,
          startingMiles,
          endingMiles,
          totalMiles,
          payMiles,
          backhaul,
        })
        toast({
          title: 'Pay added',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'cyan',
          variant: 'solid',
        })
        navigate(routes.DASHBOARD)
      } catch (error) {
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
  }

  return { addPay, isPayLoading, payError }
}
