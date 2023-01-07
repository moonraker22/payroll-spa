import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSnapshot } from 'valtio'
import { store } from '@/stores/store'
import { db, auth } from '@/firebaseConf'
import { useToast } from '@chakra-ui/react'

export function useSetAvatar() {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const snap = useSnapshot(store)
  const toast = useToast()

  async function setAvatar({ avatarUrl }) {
    setLoading(true)

    if (!snap.userId) {
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
    const docRef = doc(db, `users`, `${snap.userId}`)
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

// export function useAddPay() {
//   const [isPayLoading, setLoading] = useState(false)
//   const [payError, setPayError] = useState(null)
//   const toast = useToast()
//   const navigate = useNavigate()
//   // const { user, isLoading } = useAuth()
//   const snap = useSnapshot(store)

//   async function addPay({
//     date,
//     startingMiles,
//     endingMiles,
//     totalMiles,
//     payMiles,
//     backhaul,
//   }) {
//     setLoading(true)

//     if (!snap.userId) {
//       toast({
//         title: 'You must be logged in to add pay',
//         status: 'error',
//         isClosable: true,
//         position: 'top',
//         duration: 5000,
//         colorScheme: 'teal',
//         variant: 'solid',
//       })
//       return false
//     }
//     const q = query(
//       collection(db, `users`, `${snap.userId}`, 'paysheets'),
//       where('date', '==', date)
//     )
//     const querySnapshot = await getDocs(q)

//     if (querySnapshot.size > 0) {
//       const docId = querySnapshot.docs[0].id
//       const docRef = doc(db, `users`, `${snap.userId}`, 'paysheets', docId)

//       try {
//         await updateDoc(docRef, {
//           date,
//           uid: snap.userId,
//           startingMiles,
//           endingMiles,
//           totalMiles,
//           payMiles,
//           backhaul,
//         })
//         toast({
//           title: 'Pay updated',
//           status: 'success',
//           isClosable: true,
//           position: 'top',
//           duration: 5000,
//           colorScheme: 'teal',
//           variant: 'solid',
//         })
//         navigate(routes.DASHBOARD)
//       } catch (error) {
//         toast({
//           title: 'Updating pay failed',
//           description: error.message,
//           status: 'error',
//           isClosable: true,
//           position: 'top',
//           duration: 5000,
//           colorScheme: 'pink.500',
//           variant: 'solid',
//         })
//         setPayError(error)
//       }
//       return true
//     } else {
//       try {
//         await addDoc(collection(db, `users`, `${snap.userId}`, 'paysheets'), {
//           date,
//           uid: snap.userId,
//           startingMiles,
//           endingMiles,
//           totalMiles,
//           payMiles,
//           backhaul,
//         })
//         toast({
//           title: 'Pay added',
//           status: 'success',
//           isClosable: true,
//           position: 'top',
//           duration: 5000,
//           colorScheme: 'teal',
//           variant: 'solid',
//         })
//         navigate(routes.DASHBOARD)
//       } catch (error) {
//         toast({
//           title: 'Adding pay failed',
//           description: error.message,
//           status: 'error',
//           isClosable: true,
//           position: 'top',
//           duration: 5000,
//           colorScheme: 'pink.500',
//           variant: 'solid',
//         })
//         setPayError(error)
//       } finally {
//         setLoading(false)
//       }
//     }
//   }

//   return { addPay, isPayLoading, payError }
// }
