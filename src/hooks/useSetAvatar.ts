import { db } from '@/firebase'
import { storeActions, useStore } from '@/stores/store'
import { useToast } from '@chakra-ui/react'
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

export function useSetAvatar() {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const snap = useStore()
  const toast = useToast()

  async function setAvatar({ avatarUrl }: { avatarUrl: string }) {
    setLoading(true)

    if (!snap?.isSignedIn) {
      toast({
        title: 'You must be logged in to set avatar',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'teal',
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
        colorScheme: 'cyan',
        variant: 'solid',
      })
      setLoading(false)
    } catch (error: any) {
      setError(error)
      setLoading(false)
    }
  }
  return { setAvatar, isLoading, error }
}
