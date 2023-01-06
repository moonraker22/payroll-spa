import { Center, Spinner } from '@chakra-ui/react'
import { motion as m } from 'framer-motion'

export default function SpinnerComp() {
  return (
    <m.div
      initial={{ y: window.innerHeight / 2, opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Center>
        <Spinner
          thickness="6px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Center>
    </m.div>
  )
}
