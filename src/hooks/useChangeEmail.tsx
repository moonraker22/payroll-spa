import { auth, db } from '@/firebase'
import { routes } from '@/layout/routes'
import { COLLECTIONS, firebaseErrorMap } from '@/lib/constants'
import { storeActions } from '@/stores/store'
import { useToast } from '@chakra-ui/react'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth'
import {
  doc,
  FirestoreError,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useChangeEmail() {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<FirestoreError | Error | string | null>(
    null
  )
  const toast = useToast()
  const navigate = useNavigate()

  type ChangeEmailProps = {
    email: string
    password: string
    newEmail: string
  }

  const changeEmail = useCallback(async function ({
    email,
    password,
    newEmail,
  }: ChangeEmailProps) {
    const user = auth.currentUser
    setLoading(true)

    if (user?.providerData[0]?.providerId === 'google.com') {
      setError('Please enter your new password')
      toast({
        title: 'Password reset failed',
        description: 'Please enter your new password',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
      return
    }
    if (!password) {
      setError('Password must be at least 6 characters')
      toast({
        title: 'Password reset failed',
        description: 'Password must be at least 6 characters',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
      return
    }
    if (!email) {
      setError('Email must be at least 6 characters')
      toast({
        title: 'Password reset failed',
        description: 'Email must be at least 6 characters',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
      return
    }
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, password)
      try {
        await reauthenticateWithCredential(user, credential)
        await updateEmail(user, newEmail)
        toast({
          title: 'Email updated',
          description: 'Your email has been updated',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
          variant: 'solid',
          colorScheme: 'cyan',
        })
        storeActions.setUserEmail(newEmail)
        const ref = doc(db, COLLECTIONS.USERS, `${user.uid}`)

        await updateDoc(ref, {
          email: newEmail,
          updatedAt: serverTimestamp(),
        })
        navigate(routes.DASHBOARD, { replace: true })
      } catch (error: unknown) {
        if (error instanceof FirestoreError) {
          const errorMessage = firebaseErrorMap.get(`${error.code.toString()}`)

          toast({
            title: 'Email change failed',
            description: errorMessage || error.message,
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            variant: 'solid',
          })
          setError(error)
        } else if (error instanceof Error) {
          toast({
            title: 'Email change failed',
            description: error.message,
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            variant: 'solid',
          })
          setError(error)
        } else {
          toast({
            title: 'Email change failed',
            description: 'Something went wrong',
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            variant: 'solid',
          })
          setError(error as string)
        }
      } finally {
        setLoading(false)
      }
    }
  },
  [])
  return { changeEmail, isLoading, error }
}
