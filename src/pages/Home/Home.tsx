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

export default function Home() {
  return (
    <Box
      // bg="total"
      // bgImage="url('/background1.jpg')"
      // bgPosition="center"
      // bgRepeat="no-repeat"
      // bgAttachment="fixed"
      // bgSize="cover"
      bgGradient="linear(to-b, gray.800, cyan.900, gray.800)"
      h="100vh"
      w="100vw"
    >
      <div className="home">
        <h1>bbb</h1>
      </div>
    </Box>
  )
}
