import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  Spacer,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { routes } from '../../lib/routes'

export default function Home() {
  const color = useColorModeValue('gray.700', 'gray.300')
  const gradientColor = useColorModeValue(
    'gray.300',
    'linear(to-b, gray.800, cyan.900, gray.800)'
  )

  return (
    <Center
      bgGradient={'linear(to-b, gray.800, cyan.900, gray.800)'}
      h="100vh"
      w="100vw"
      bg={gradientColor}
    >
      <m.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.7, scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6 }}
      >
        <Box
          w={{ base: '100%', sm: '510px' }}
          rounded={20}
          borderWidth="1px"
          borderColor="cyan.300"
          mb="20"
          p="5px"
          bg="gray.800"
          boxShadow={'dark-lg'}
        >
          <Box
            as={m.div}
            // direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            // variant="elevated"
            bg="black"
            p="20px"
            rounded={20}
            w={{ base: '100%', sm: '500px' }}
            bgColor={gradientColor}
            // opacity={0.7}
            borderWidth="1px"
            borderColor="cyan.300"
            display={{ base: 'flex', sm: 'block' }}
          >
            {/* <Box maxW={{ base: '100%', sm: '200px' }} /> */}

            <Stack>
              {/* <CardBody> */}
              <Heading
                bgGradient="linear(to-b, #42047e, #07f49e)"
                bgClip="text"
                my="5"
                size={'2xl'}
                textAlign="center"
              >
                Payroll Tracker
              </Heading>
              <Center>
                <Text py="2" color={color}>
                  An app to track miles and pay for Tulsa Transport.
                </Text>
              </Center>
              <Center>
                <Text py="2" color={color}>
                  Get started by signing up for a free account or logging in.
                </Text>
              </Center>
              <Flex dir="row" my="10">
                <Button
                  m="5"
                  variant="outline"
                  colorScheme="cyan"
                  as={RouterLink}
                  to={routes.REGISTER}
                  _hover={{
                    bg: 'cyan.800',
                    color: 'white',
                    scale: 1.1,
                  }}
                >
                  Register
                </Button>
                <Spacer />
                <Button
                  m="5"
                  variant="outline"
                  colorScheme="cyan"
                  as={RouterLink}
                  to={routes.LOGIN}
                  _hover={{
                    bg: 'cyan.800',
                    color: 'white',
                    scale: 1.1,
                  }}
                >
                  Sign in
                </Button>
              </Flex>
              {/* </CardBody> */}
            </Stack>
          </Box>
        </Box>
      </m.div>
    </Center>
  )
}
