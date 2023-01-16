import { Container, Heading, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { motion as m } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { routes } from '../../lib/routes'

export default function NotFoundPage() {
  return (
    <Container>
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
        404
      </Heading>
      <Text>Whoops that page doesn't exist</Text>
      <Link as={RouterLink} to={routes.DASHBOARD}>
        Go back to the homepage
      </Link>
    </Container>
  )
}
