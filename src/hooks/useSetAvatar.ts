import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { store } from '@/stores/store'
import { db } from '@/firebaseConf'
import { useToast } from '@chakra-ui/react'
import { useAuth } from './useAuth'

export function useSetAvatar() {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const toast = useToast()

  async function setAvatar({ avatarUrl }) {
    setLoading(true)

    if (!user) {
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
    const docRef = doc(db, `users`, user.id)

    try {
      await updateDoc(docRef, {
        avatar: avatarUrl,
      })
      store.avatar = avatarUrl
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
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }
  return { setAvatar, isLoading, error }
}
