import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  getDocs,
  getDoc,
} from 'firebase/firestore'
// import { Pay } from '../stores/payStore'

// export const useFirestore = () => {
//   const db = getFirestore()
//   const collectionRef = collection(db, 'payroll')
//   const queryRef = query(collectionRef, orderBy('date', 'desc'))
//   const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
//     const data = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }))
//     //     set((state) => {
//     //       state.pay = data
//     //     })
//   })
//   return () => unsubscribe()

//   addPay: async (pay: Pay) => {
//     await addDoc(collectionRef, {
//       ...pay,
//       date: serverTimestamp(),
//     })
//   }
//   deletePay: async (id: string) => {
//     await deleteDoc(doc(collectionRef, id))
//   }
//   updatePay: async (pay: Pay) => {
//     await updateDoc(doc(collectionRef, pay.id), {
//       ...pay,
//       date: serverTimestamp(),
//     })
//   }
//   getPay: async (id: string) => {
//     const docRef = doc(collectionRef, id)
//     const docSnap = await getDoc(docRef)
//     if (docSnap.exists()) {
//       return docSnap.data()
//     } else {
//       return null
//     }
//   }
//   getPayByDate: async (date: string) => {
//     const queryRef = query(collectionRef, where('date', '==', date))
//     const querySnapshot = await getDocs(queryRef)
//     if (!querySnapshot.empty) {
//       return querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//     } else {
//       return null
//     }
//   }
// }
