import {
  Image,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Stack,
  Text,
  HStack,
  Spacer,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { routes } from '../../lib/routes'

export default function Home() {
  const bg = useColorModeValue('white', ' gray.800')
  const color = useColorModeValue('gray.800', 'gray.300')
  return (
    <Center
      bgGradient="linear(to-b, gray.800, cyan.900, gray.800)"
      h="100vh"
      w="100vw"
    >
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="elevated"
        bg={bg}
        p="20px"
        rounded={20}
        w={{ base: '100%', sm: '500px' }}
      >
        <Box maxW={{ base: '100%', sm: '200px' }} />

        <Stack>
          <CardBody>
            <Heading
              bgGradient="linear(to-b, #42047e, #07f49e)"
              bgClip="text"
              my="5"
              size={'2xl'}
            >
              Payroll Tracker
            </Heading>

            <Text py="2" color={color}>
              An app to track miles and pay for Tulsa Transport.
            </Text>
            <Text py="2" color={color}>
              Get started by clicking the button below
            </Text>

            <Flex dir="row" my="10">
              <Button
                variant="outline"
                colorScheme="cyan"
                as={RouterLink}
                to={routes.REGISTER}
              >
                Register
              </Button>
              <Spacer />
              <Button
                variant="outline"
                colorScheme="cyan"
                as={RouterLink}
                to={routes.LOGIN}
              >
                Sign in
              </Button>
            </Flex>
          </CardBody>
        </Stack>
      </Card>
    </Center>
  )
}
