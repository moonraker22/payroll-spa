import { routes } from '@/layout/routes'
import { Container, Heading, Link, Text } from '@chakra-ui/react'
import { motion as m } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Container>
      <Heading
        as={m.h1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        mt={10}
        bgGradient="linear(to-b, #42047e, #07f49e)"
        bgClip="text"
        fontSize={['4xl', '4xl', '5xl']}
        fontWeight="extrabold"
      >
        404
      </Heading>
      <Text>Whoops that page doesn't exist</Text>
      <Link as={RouterLink} to={routes.DASHBOARD}>
        Go back to the homepage
      </Link>
    </Container>
  )
}
