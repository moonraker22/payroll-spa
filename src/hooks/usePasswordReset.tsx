import { auth } from '@/firebase'
import { routes } from '@/layout/routes'
import { firebaseErrorMap } from '@/lib/constants'
import { useToast } from '@chakra-ui/react'
import {
  confirmPasswordReset,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword,
} from 'firebase/auth'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type UsePasswordReset = () => {
  error: string
  loading: boolean
  passwordResetEmail: (email: string) => Promise<void>
  confirmPassReset: (code: string, newPassword: string) => Promise<void>
  updatePass: (newPassword: string, currentPassword: string) => Promise<void>
}

export const usePasswordReset: UsePasswordReset = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const toast = useToast()

  const passwordResetEmail = useCallback(async (email: string) => {
    setLoading(true)
    if (email.length === 0) {
      setError('Please enter your email')
      toast({
        title: 'Password reset failed',
        description: 'Please enter your email',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      toast({
        title: 'Password reset email sent, please check your inbox',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'cyan',
        variant: 'solid',
      })
      navigate(routes.LOGIN)
    } catch (error: any) {
      const errorMessage = firebaseErrorMap.get(error?.code)
      setError(errorMessage ?? error.message)
      toast({
        title: 'Password reset failed',
        description: errorMessage ?? error.message ?? 'An error occurred',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const confirmPassReset = useCallback(
    async (code: string, newPassword: string) => {
      setLoading(true)
      if (code.length === 0) {
        setError('Please enter your code')
        toast({
          title: 'Password reset failed',
          description: 'Please enter your code',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
          variant: 'solid',
        })
        return
      }
      if (newPassword.length === 0) {
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
      if (newPassword.length < 6) {
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
      try {
        await confirmPasswordReset(auth, code, newPassword)
        toast({
          title: 'Password reset successful',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
          colorScheme: 'cyan',
          variant: 'solid',
        })
        navigate(routes.LOGIN)
      } catch (error: any) {
        const errorMessage = firebaseErrorMap.get(error.code)
        setError(errorMessage ?? error.message)
        toast({
          title: 'Password reset failed',
          description: errorMessage ?? error.message ?? 'An error occurred',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
          variant: 'solid',
        })
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const updatePass = useCallback(
    async (newPassword: string, currentPassword: string) => {
      setLoading(true)
      const user = auth.currentUser

      if (newPassword.length === 0) {
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
      if (currentPassword.length === 0) {
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
      if (user?.email != null) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        )
        try {
          await reauthenticateWithCredential(user, credential)
          await updatePassword(user, newPassword)
          toast({
            title: 'Password reset successful',
            status: 'success',
            isClosable: true,
            position: 'top',
            duration: 5000,
            colorScheme: 'cyan',
            variant: 'solid',
          })
          navigate(routes.LOGIN)
        } catch (error: any) {
          const errorMessage = firebaseErrorMap.get(error.code)
          setError(errorMessage ?? error.message)
          toast({
            title: 'Password reset failed',
            description: errorMessage ?? error.message ?? 'An error occurred',
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
            variant: 'solid',
          })
        } finally {
          setLoading(false)
        }
      }
    },
    []
  )
  return { error, loading, passwordResetEmail, confirmPassReset, updatePass }
}
