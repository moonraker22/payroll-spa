import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useAuth, useLogin, useLogout, useRegister } from '@/hooks/useAuth'
import { useIdToken } from 'react-firebase-hooks/auth'
import { devtools } from 'zustand/middleware'
import { auth } from '@/firebaseConf'

// const { login, isLoading: loginLoading } = useLogin()

// const { register, isLoading: registerLoading } = useRegister()

// const { logout } = useLogout()

// const { user, isLoading: authLoading } = useAuth()
const useAuthStore = create(
  devtools(
    immer<State & Actions>((set, get) => ({
      user: {},
      userId: '',
      userEmail: '',
      useAuth,
      useLogin,
      useLogout,
      useRegister,
    }))
  )
)

export default useAuthStore

interface State {
  user: any
  userId: string
  userEmail: string
}

interface Actions {
  useAuth: () => { user: any; isLoading: boolean; error: Error }
  useLogin: () => {
    login: ({
      email,
      password,
      redirectTo,
    }: {
      email: any
      password: any
      redirectTo?: string
    }) => Promise<void>
    isLoading: boolean
    error: any
  }
  useLogout: () => { logout: () => void }
  useRegister: () => {
    register: ({
      email,
      password,
      redirectTo,
    }: {
      email: any
      password: any
      redirectTo?: string
    }) => Promise<void>
    isLoading: boolean
    error: any
  }
}
