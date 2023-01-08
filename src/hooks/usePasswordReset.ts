import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from './useAuth'
import { useNavigate } from 'react-router-dom'
import { auth } from '@/firebaseConf'

import {
  getAuth,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

export const usePasswordReset = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [authUser, authLoading, authError] = useAuthState(auth)

  const navigate = useNavigate()
  const toast = useToast()

  const passwordResetEmail = async (email: string) => {
    setLoading(true)
    if (!email) {
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
    if (!authUser) {
      setError('User not found')
      toast({
        title: 'Password reset failed',
        description: 'User not found',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
      return
    }
    if (authUser.email !== email) {
      setError('Email does not match')
      toast({
        title: 'Password reset failed',
        description: 'Email does not match',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
        variant: 'solid',
      })
      return
    }
    if (!authLoading && !authError)
      try {
        // const auth = getAuth()
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
        navigate('/login')
      } catch (error) {
        setError(error.message)
        toast({
          title: 'Password reset failed',
          description: error.message,
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

  const confirmPassReset = async (code: string, newPassword: string) => {
    setLoading(true)
    if (!code) {
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
    if (!newPassword) {
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
      // const auth = getAuth()
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
      navigate('/login')
    } catch (error) {
      setError(error.message)
      toast({
        title: 'Password reset failed',
        description: error.message,
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

  const updatePass = async (newPassword: string, currentPassword: string) => {
    setLoading(true)

    if (!newPassword) {
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
    if (!currentPassword) {
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
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      )

      await reauthenticateWithCredential(auth.currentUser, credential)
      // const auth = getAuth()
      const res = await updatePassword(auth.currentUser, newPassword)
      console.log(res)
      toast({
        title: 'Password reset successful',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
        colorScheme: 'cyan',
        variant: 'solid',
      })
      navigate('/login')
    } catch (error) {
      setError(error.message)
      toast({
        title: 'Password reset failed',
        description: error.message,
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

  return { error, loading, passwordResetEmail, confirmPassReset, updatePass }
}
