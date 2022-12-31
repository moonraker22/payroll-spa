import create from 'zustand'
// import { immer } from 'zustand/middleware/immer'
// import { auth } from '../firebaseConf'
// import {
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
// } from 'firebase/auth'
// import { devtools } from 'zustand/middleware'

// import { useEffect } from 'react'

// const useStore = create(
//   immer<State & Actions>((set, get) => ({
//     pay: [],
//     week: [],
//     signedIn: false,
//     userID: '',
//     userEmail: '',
//     addPay: (pay: Pay) => {
//       const currentStore = get()
//       if (currentStore.pay.find((item) => item.id === pay.id)) {
//         currentStore.pay = currentStore.pay.map((item) => {
//           if (item.id === pay.id) {
//             return pay
//           }
//           return item
//         })
//         return
//       }
//       set((state) => {
//         state.pay.push(pay)
//       })
//     },
//     addWeek: (week: Week) => {
//       const currentStore = get()
//       if (currentStore.week.find((item) => item.id === week.id)) {
//         currentStore.week = currentStore.week.map((item) => {
//           if (item.id === week.id) {
//             return week
//           }
//           return item
//         })
//         return
//       }
//       set((state) => {
//         state.week.push(week)
//       })
//     },
//     registerUser: (email: string, password: string) => {
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user
//           set((state) => {
//             state.signedIn = true
//             state.userID = user?.uid
//             state.userEmail = user?.email
//           })
//         })
//         .catch((error) => {
//           const errorCode = error.code
//           const errorMessage = error.message
//           console.log(errorCode, errorMessage)
//         })
//     },
//     loginUser: (email: string, password: string) => {
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user
//           set((state) => {
//             state.signedIn = true
//             state.userID = user?.uid
//             state.userEmail = user?.email
//           })
//         })
//         .catch((error) => {
//           const errorCode = error.code
//           const errorMessage = error.message
//           console.log(errorCode, errorMessage)
//         })
//     },
//     logout: () => {
//       signOut(auth)
//         .then(() => {
//           set((state) => {
//             state.signedIn = false
//             state.userID = ''
//             state.userEmail = ''
//           })
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     },
//     // resetPassword: (email: string) => {
//     //   sendPasswordResetEmail(auth, email)
//     // },
//     // updateEmail: (email: string) => {
//     //   auth.currentUser?.updateEmail(email)
//     // },
//     // updatePassword: (password: string) => {
//     //   auth.currentUser?.updatePassword(password)
//     // },
//     // onAuthStateChanged: (callback: (user: any) => void) => {
//     //   return onAuthStateChanged(auth, callback)
//     // },
//     // user: () => auth.currentUser,
//   }))
// )

// // export const useAuth = () => {
// //   const store = useStore()
// //   useEffect(() => {
// //     const unsubscribe = store.onAuthStateChanged((user) => {
// //       if (user) {
// //         store.signedIn = true
// //         store.userID = user.uid
// //         store.userEmail = user.email
// //       } else {
// //         store.signedIn = false
// //         store.userID = ''
// //         store.userEmail = ''
// //       }
// //     })
// //     return () => unsubscribe()
// //   }, [store])
// //   return store
// // }

// export default useStore

// export interface Pay {
//   id: string
//   date: string
//   startingMiles: number
//   endingMiles: number
//   totalMiles: number
//   payMiles: number
//   backhaul: number
// }

// type Actions = {
//   addPay: (pay: Pay) => void
//   addWeek: (week: Week) => void
//   registerUser: (email: string, password: string) => void
//   loginUser: (email: string, password: string) => void
//   logout: () => void
//   // resetPassword: (email: string) => void
//   // updateEmail: (email: string) => void
//   // updatePassword: (password: string) => void
//   // onAuthStateChanged: (callback: (user: any) => void) => () => void
//   // user: () => any
// }

// type State = {
//   pay: Pay[]
//   week: Week[]
//   signedIn: boolean
//   userID: string
//   userEmail: string
// }

// export interface Week {
//   id: string
//   weekStartingDate: string
//   totalMiles: number
//   payMiles: number
//   backhaul: number
//   totalPay: number
// }