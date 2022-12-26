import { Box } from '@chakra-ui/react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
export default function Home() {
  const [collectionData, setCollectionData] = useState([])
  const fetchCollection = async () => {
    await getDocs(collection(db, 'users')).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data())
      setCollectionData(data[0].pay[0])
      console.log(data, 'data')
      console.log(collectionData, 'collectionData')
    })
  }

  useEffect(() => {
    fetchCollection()
  }, [])
  return (
    <Box bg="brand.primary">
      <div className="home">
        <h1>Home</h1>
      </div>
    </Box>
  )
}
