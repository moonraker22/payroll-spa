import { Center, Container, Heading } from '@chakra-ui/react'
import { motion as m } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import DailyForm from './DailyForm'

export default function DailyPage() {
  const location = useLocation()
  return (
    <Container
      maxW="container.xl"
      centerContent
      bg={'"linear(to-b, #42047e, #07f49e)"'}
    >
      <Center>
        <Heading
          as={m.h1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          mt={10}
          // bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgGradient="linear(to-b, #42047e, #07f49e)"
          // bgGradient="linear(to-r, teal, red.500)"
          bgClip="text"
          fontSize={['4xl', '4xl', '5xl']}
          fontWeight="extrabold"
        >
          Daily Form
        </Heading>
      </Center>
      <DailyForm />
    </Container>
  )
}
