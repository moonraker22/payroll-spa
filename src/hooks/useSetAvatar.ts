import { db } from '@/firebase'
import { storeActions, useStore } from '@/stores/store'
import { useToast } from '@chakra-ui/react'
import {
  doc,
  FirestoreError,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { useCallback, useState } from 'react'

export function useSetAvatar() {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<FirestoreError | Error | null>(null)
  const snap = useStore()
  const toast = useToast()

  const setAvatar = useCallback(async (avatarUrl: string) => {
    setLoading(true)

    if (!snap?.isSignedIn) {
      toast({
        title: 'You must be logged in to set avatar',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'red',
        variant: 'solid',
      })
      return false
    }
    const docRef = doc(db, `users`, `${snap?.userId || 'empty'}`)

    try {
      await updateDoc(docRef, {
        avatar: avatarUrl,
        updatedAt: serverTimestamp(),
      })
      storeActions.setAvatar(avatarUrl)
      toast({
        title: 'Avatar updated',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'teal',
        variant: 'solid',
      })
      setLoading(false)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error)
        toast({
          title: 'Error updating avatar',
          description: error.message,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'red',
          variant: 'solid',
        })
      } else if (error instanceof FirestoreError) {
        setError(error)
        toast({
          title: 'Error updating avatar',
          description: error.message,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'red',
          variant: 'solid',
        })
      }
      setLoading(false)
    }
  }, [])

  return { setAvatar, isLoading, error }
}
