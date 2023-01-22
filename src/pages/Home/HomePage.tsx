import { routes } from '@/layout/routes'
import { ArrowForwardIcon } from '@chakra-ui/icons'
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
import { AiOutlineEdit } from 'react-icons/ai'
import { Link as RouterLink } from 'react-router-dom'

export default function Home() {
  const color = useColorModeValue('gray.700', 'gray.300')
  const innerGradientColor = useColorModeValue(
    'blackAlpha.200',
    'blackAlpha.500'
  )
  const buttonBackground = useColorModeValue('cyan.700', '')
  const buttonColor = useColorModeValue('white', 'cyan.300')
  const headingColor = useColorModeValue(
    'linear(to-b, #1A202C, #1C3143)',
    'linear(to-b, #42047e, #07f49e)'
  )

  const linear = useColorModeValue(
    'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(14,149,203,0.8954175420168067) 40%, rgba(14,149,203,0.8898153011204482) 60%, rgba(255,255,255,1) 100%)',
    'linear-gradient(180deg, rgba(26,32,44,0.9542410714285714) 20%, rgba(14,149,203,0.8169861694677871) 46%, rgba(14,149,203,0.8674063375350141) 54%, rgba(26,32,44,0.9430365896358543) 80%)'
  )
  return (
    <Center
      as={m.div}
      initial={{ background: 'gray' }}
      animate={{
        background: [linear],
      }}
      // bgGradient={'linear(to-b, gray.800, cyan.900, gray.800)'}
      // bgGradient={'radial( cyan.900, gray.800, gray.900)'}
      h="100vh"
      w="100vw"
      // bg={gradientColor}
      p="10px"
    >
      <m.div
        initial={{ opacity: 0, scale: 0, borderRadius: 0 }}
        animate={{
          opacity: [0.4, 0.9, 0.7, 0.8],
          scale: [0, 1.1, 1],
          borderRadius: [0, 10, 15, 20],
        }}
        transition={{ duration: 0.6 }}
        style={{ margin: '8px' }}
      >
        <Box
          as={m.div}
          // transition={{ duration: 0.6 }}
          w={{ base: '100%', sm: '510px' }}
          rounded={20}
          borderWidth="1px"
          // borderColor="cyan.300"
          mb="20"
          p="15px"
          bg="transparent"
          boxShadow={'dark-lg'}
          mx="auto"
        >
          <Box
            as={m.div}
            overflow="hidden"
            bg="black"
            p="25px"
            rounded={20}
            h="350px"
            // w={{ base: '100%', sm: '500px' }}s
            // h="340px"
            bgColor={innerGradientColor}
            borderWidth="1px"
            // borderColor="cyan.300"
            display={{ base: 'flex', sm: 'block' }}
          >
            <Stack>
              <Heading
                as={'h1'}
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
                  rightIcon={<AiOutlineEdit />}
                >
                  Sign Up
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
                  rightIcon={<ArrowForwardIcon />}
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
