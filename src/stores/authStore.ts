import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useAuth, useLogin, useLogout, useRegister } from '@/hooks/useAuth'
import { useIdToken } from 'react-firebase-hooks/auth'
import { devtools } from 'zustand/middleware'
import { auth } from '@/firebaseConf'
import { onAuthStateChanged } from 'firebase/auth'

// const { login, isLoading: loginLoading } = useLogin()

// const { register, isLoading: registerLoading } = useRegister()

// const { logout } = useLogout()

// const { user, isLoading: authLoading } = useAuth()
const useAuthStore = create(
  devtools(
    immer<State & Actions>((set, get) => ({
      // user: {},
      userId: '',
      userEmail: '',
      useAuth,
      useLogin,
      useLogout,
      useRegister,
      onAuthStateChanged: (callback: (user: any) => void) => {
        return onAuthStateChanged(auth, callback)
      },
      user: () => auth.currentUser,
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
  onAuthStateChanged: (user: any) => void
  user: () => void
}

// const useStore = create(
//   devtools(
//     immer<State & Actions>((set, get) => ({
//       // pay: [],
// week: [],
// errorCode: '',
// errorMessage: '',
// signedIn: false,
// userID: '',
// userEmail: '',
// addPay: (pay: Pay) => {
//   const currentStore = get()
//   if (currentStore.pay.find((item) => item.id === pay.id)) {
//     currentStore.pay = currentStore.pay.map((item) => {
//       if (item.id === pay.id) {
//         return pay
//       }
//       return item
//     })
//     return
//   }
//   set((state) => {
//     state.pay.push(pay)
//   })
// },
// addWeek: (week: Week) => {
//   const currentStore = get()
//   if (currentStore.week.find((item) => item.id === week.id)) {
//     currentStore.week = currentStore.week.map((item) => {
//       if (item.id === week.id) {
//         return week
//       }
//       return item
//     })
//     return
//   }
//   set((state) => {
//     state.week.push(week)
//   })
// },
// registerUser: (email: string, password: string) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user
//       set((state) => {
//         state.signedIn = true
//         state.userID = user?.uid
//         state.userEmail = user?.email
//         state.errorCode = ''
//         state.errorMessage = ''
//       })
//     })
//     .catch((error) => {
//       const errorCode = error.code
//       const errorMessage = error.message
//       set((state) => {
//         state.errorCode = errorCode
//         state.errorMessage = errorMessage
//       })
//     })
// },
// loginUser: (email: string, password: string) => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user
//       set((state) => {
//         state.signedIn = true
//         state.userID = user?.uid
//         state.userEmail = user?.email
//         state.errorCode = ''
//         state.errorMessage = ''
//       })
//     })
//     .catch((error) => {
//       const errorCode = error.code
//       const errorMessage = error.message
//       set((state) => {
//         state.errorCode = errorCode
//         state.errorMessage = errorMessage
//       })
//     })
// },
// logout: () => {
//   signOut(auth)
//     .then(() => {
//       set((state) => {
//         state.signedIn = false
//         state.userID = ''
//         state.userEmail = ''
//         state.errorCode = ''
//         state.errorMessage = ''
//       })
//     })
//     .catch((error) => {
//       const errorCode = error.code
//       const errorMessage = error.message
//       set((state) => {
//         state.errorCode = errorCode
//         state.errorMessage = errorMessage
//       })
//     })
// },
// resetPassword: (email: string) => {
//   sendPasswordResetEmail(auth, email)
// },
// updateEmail: (email: string) => {
//   auth.currentUser?.updateEmail(email)
// },
// updatePassword: (password: string) => {
//   auth.currentUser?.updatePassword(password)
// },
//       onAuthStateChanged: (callback: (user: any) => void) => {
//         return onAuthStateChanged(auth, callback)
//       },
//       user: () => auth.currentUser,
//     })),
//     { enabled: import.meta.env.DEV }
//   )
// )
