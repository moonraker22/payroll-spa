import { routes } from '@/layout/routes'
import { Box, Center, Heading, Link, Text } from '@chakra-ui/react'
import {
  isRouteErrorResponse,
  Link as RouterLink,
  useRouteError,
} from 'react-router-dom'

export default function RootBoundary(): JSX.Element {
  const error = useRouteError()

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.trace(`error: ${error}`)

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Heading as={'h1'} size={'2xl'}>
          This page doesn&apos;t exist!
        </Heading>
      )
    }

    if (error.status === 401) {
      return (
        <Heading as={'h1'} size={'2xl'}>
          You aren&apos;t authorized to see this
        </Heading>
      )
    }

    if (error.status === 503) {
      return (
        <Heading as={'h1'} size={'2xl'}>
          Looks like our API is down
        </Heading>
      )
    }

    if (error.status === 418) {
      return (
        <Heading as={'h1'} size={'2xl'}>
          🫖
        </Heading>
      )
    }
  }

  return (
    <>
      <Heading as={'h1'} size={'2xl'}>
        Whoops something went wrong
      </Heading>
      <Center>
        <Box>
          <Text size={'xl'}>
            Go back to{' '}
            <Link as={RouterLink} to={routes.DASHBOARD}>
              Dashboard
            </Link>{' '}
            or{' '}
            <Link as={RouterLink} to={routes.HOME}>
              Home
            </Link>
          </Text>{' '}
        </Box>
      </Center>
    </>
  )
}
