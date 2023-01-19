import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion as m } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { routes } from '../../lib/routes'

export default function Home() {
  const color = useColorModeValue('gray.700', 'gray.300')
  const gradientColor = useColorModeValue(
    'radial-gradient(circle, rgba(26,32,44,1) 2%, rgba(14,149,203,1) 36%, rgba(255,255,255,1) 62%)',
    'radial-gradient(circle, rgba(233,222,231,1) 2%, rgba(14,149,203,1) 36%, rgba(26,32,44,1) 62%)'
  )
  const innerGradientColor = useColorModeValue(
    'gray.400',
    'linear(to-b, gray.800, cyan.900, gray.800)'
  )
  const buttonBackground = useColorModeValue('cyan.700', '')
  const buttonColor = useColorModeValue('white', 'cyan.300')
  const headingColor = useColorModeValue(
    'linear(to-b, #1A202C, #1C3143)',
    'linear(to-b, #42047e, #07f49e)'
  )

  return (
    <Center
      as={m.div}
      initial={{ background: 'gray' }}
      animate={{
        background: gradientColor,
      }}
      // bgGradient={'linear(to-b, gray.800, cyan.900, gray.800)'}
      // bgGradient={'radial( cyan.900, gray.800, gray.900)'}
      h="100vh"
      w="100vw"
      // bg={gradientColor}
    >
      <m.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.4, 0.9, 0.7, 0.8],
          scale: [0, 1.1, 1],
        }}
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
            overflow="hidden"
            bg="black"
            p="20px"
            rounded={20}
            w={{ base: '100%', sm: '500px' }}
            bgColor={innerGradientColor}
            borderWidth="1px"
            borderColor="cyan.300"
            display={{ base: 'flex', sm: 'block' }}
          >
            <Stack>
              <Heading
                // bgGradient="linear(to-b, #42047e, #07f49e)"
                bgGradient={headingColor}
                bgClip="text"
                my="5"
                size={'2xl'}
                textAlign="center"
              >
                Pay Tracker
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
                  bg={buttonBackground}
                  color={buttonColor}
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
                  bg={buttonBackground}
                  color={buttonColor}
                >
                  Sign in
                </Button>
              </Flex>
            </Stack>
          </Box>
        </Box>
      </m.div>
    </Center>
  )
}
