import { Box } from '@chakra-ui/react'
import { db, auth } from '@/firebaseConf'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDocFromServer,
} from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useIdToken } from 'react-firebase-hooks/auth'
import useAuthStore from '@/stores/authStore'
import { useAuth } from '../../hooks/useAuth'

export default function Home() {
  // const [collectionData, setCollectionData] = useState([])
  // const fetchCollection = async () => {
  //   await getDocs(collection(db, 'users')).then((querySnapshot) => {
  //     const data = querySnapshot.docs.map((doc) => doc.data())
  //     // setCollectionData(data)
  //     // console.log(data, 'data')
  //     // console.log(collectionData, 'collectionData')
  //   })
  // }
  // const [value, loading, error] = useCollection(
  //   collection(db, 'users/clrMHQ6VPXiUDwArc293/paysheets'),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // )
  // const state = useAuthStore((state) => state)
  // console.log(state, 'state')
  const useAuth = useAuthStore((state) => state.useAuth)
  // const collRef = collection(db, 'users/clrMHQ6VPXiUDwArc293/paysheets')

  // const addData = async () => {
  //   await addDoc(collRef, {
  //     // date:
  //     startingMiles: 100,
  //     endingMiles: 200,
  //     totalMiles: 100,
  //     payMiles: 100,
  //     backhaul: 100,
  //   })
  // }
  // const docRef = addData()
  // console.log(docRef, 'docRef')
  // {
  //   console.log(value?.docs[0].data(), 'value?.docs[0].data()')
  // }
  // const id = value?.docs[0].id
  // useEffect(() => {
  //   // fetchCollection()
  //   const docRef = addData()
  //   console.log(docRef)
  // }, [])
  const { user, isLoading, error } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>Not logged in</div>
  // console.log(user, 'user')

  return (
    <Box bg="brand.primary">
      <div className="home">
        <h1>bbb</h1>
      </div>
    </Box>
  )
}
