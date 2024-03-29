import { type PTOType } from '@/data/paySchema'
import { db } from '@/firebase'
import { COLLECTIONS } from '@/lib/constants'
import { storeActions, useStore } from '@/stores/store'
import { useToast } from '@chakra-ui/react'
import {
  doc,
  FirestoreError,
  getDoc,
  updateDoc,
  type DocumentData,
  type DocumentReference,
  type DocumentSnapshot,
} from 'firebase/firestore'
import { useCallback, useState } from 'react'

type UsePTO = () => {
  isPTOLoading: boolean
  ptoError: FirestoreError | Error | null
  addPTO: (numberOfDays: PTOType) => Promise<boolean | undefined>
  subtractPTO: (numberOfDays: PTOType) => Promise<boolean | undefined>
}

export const usePTO: UsePTO = () => {
  const toast = useToast()
  const snap = useStore()
  const [isPTOLoading, setLoading] = useState(false)
  const [ptoError, setPtoError] = useState<FirestoreError | Error | null>(null)

  const addPTO = useCallback(
    async (numberOfDays: PTOType) => {
      const { days } = numberOfDays
      setLoading(true)
      if (snap?.userId === null) {
        toast({
          title: 'You must be logged in to add PTO',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'red',
          variant: 'solid',
        })
        return false
      }
      if (days < 0) {
        toast({
          title: 'You must enter a positive number',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'red',
          variant: 'solid',
        })
        return false
      }
      if (days >= 0) {
        try {
          const docRef = doc(db, COLLECTIONS.USERS, `${snap?.userId}`)
          const docSnap = await getDoc(docRef)
          const pto = docSnap.get('pto') as number
          const newPto = pto + days

          if (pto !== undefined) {
            await updateDoc(doc(db, COLLECTIONS.USERS, `${snap?.userId}`), {
              pto: newPto,
            })
            storeActions.setPto(newPto)
            toast({
              title: 'PTO added',
              status: 'success',
              isClosable: true,
              position: 'top',
              duration: 5000,
              colorScheme: 'teal',
              variant: 'solid',
            })
          }
          return true
        } catch (error: unknown) {
          if (error instanceof Error) {
            setPtoError(error)
            toast({
              title: 'Error adding PTO',
              status: 'error',
              isClosable: true,
              position: 'top',
              duration: 5000,
              colorScheme: 'red',
              variant: 'solid',
            })
            return false
          } else if (error instanceof FirestoreError) {
            setPtoError(error)
            toast({
              title: 'Error adding PTO',
              status: 'error',
              isClosable: true,
              position: 'top',
              duration: 5000,
              colorScheme: 'red',
              variant: 'solid',
            })
            return false
          } else {
            setPtoError(new Error('Unknown error adding PTO'))
            toast({
              title: 'Error adding PTO',
              status: 'error',
              isClosable: true,
              position: 'top',
              duration: 5000,
              colorScheme: 'red',
              variant: 'solid',
            })
            return false
          }
        } finally {
          setLoading(false)
        }
      }
    },
    [snap?.userId]
  )

  const subtractPTO = useCallback(async (numberOfDays: PTOType) => {
    const { days } = numberOfDays
    setLoading(true)
    if (snap?.userId === null) {
      toast({
        title: 'You must be logged in to subtract PTO',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'red',
        variant: 'solid',
      })
      return false
    }
    if (days < 0) {
      toast({
        title: 'You must enter a positive number',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'red',
        variant: 'solid',
      })
      return false
    }
    if (days >= 0) {
      try {
        const docRef: DocumentReference<DocumentData> = doc(
          db,
          COLLECTIONS.USERS,
          `${snap?.userId}`
        )
        const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef)
        const pto = docSnap.get('pto') as number
        const newPto = pto - days < 0 ? 0 : pto - days

        if (pto !== undefined) {
          await updateDoc(doc(db, COLLECTIONS.USERS, `${snap?.userId}`), {
            pto: newPto,
          })
          storeActions.setPto(newPto)
          toast({
            title: 'PTO subtracted',
            status: 'success',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'teal',
            variant: 'solid',
          })
        }
        return true
      } catch (error: unknown) {
        if (error instanceof Error) {
          setPtoError(error)
          toast({
            title: 'Error subtracting PTO',
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'red',
            variant: 'solid',
          })
          return false
        } else if (error instanceof FirestoreError) {
          setPtoError(error)
          toast({
            title: 'Error subtracting PTO',
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'red',
            variant: 'solid',
          })
          return false
        } else {
          setPtoError(new Error('Unknown error subtracting PTO'))
          toast({
            title: 'Error subtracting PTO',
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'red',
            variant: 'solid',
          })
          return false
        }
      } finally {
        setLoading(false)
      }
    }
  }, [])

  return {
    addPTO,
    subtractPTO,
    isPTOLoading,
    ptoError,
  }
}
