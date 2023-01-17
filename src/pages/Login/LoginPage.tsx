import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Container,
  Text,
  Center,
  Divider,
  useColorModeValue,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
  HStack,
  Heading,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Login as LoginResolver, LoginType } from '@/data/paySchema'
import { useEffect, useRef } from 'react'
import { motion as m } from 'framer-motion'
import { useLogin } from '@/hooks/useAuth'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { GoogleIcon } from './GoogleIcon'
import { routes } from '@/lib/routes'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import { store } from '@/stores/store'
import { useSnapshot } from 'valtio'

export default function Login() {
  const snap = useSnapshot(store)

  const navigate = useNavigate()
  const textColor = useColorModeValue('gray.800', 'gray')

  useEffect(() => {
    if (snap.userId) {
      navigate(routes.DASHBOARD)
    }
  }, [snap.userId])

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginResolver),
  })

  const bg = useColorModeValue('white', ' gray.800')
  const color = useColorModeValue('gray.800', 'white')

  const password = watch('password')
  const email = watch('email')
  const canSubmit = isDirty && isValid && password && email
  // const { loginUser } = useStore()
  const { login, isLoading, error } = useLogin()

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      login({ email: data.email, password: data.password })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setFocus('email')
  }, [])
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  const {
    googleLogin,
    isLoading: googleLoading,
    error: googleError,
  } = useGoogleAuth()

  const googleSubmit = async () => {
    try {
      googleLogin()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxW="container.xl" centerContent mt={8}>
      <m.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <Center mt={5}>
          <Heading
            mt="10"
            fontSize={['4xl', '4xl', '5xl']}
            as={m.h1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            bgGradient="linear(to-b, #42047e, #07f49e)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Login
          </Heading>
        </Center>
        <Box
          bg={bg}
          border="2px"
          borderColor="gray.700"
          boxShadow="dark-lg"
          p="6"
          rounded="md"
          mt={10}
          mb={10}
          w="50vw"
          maxW="450px"
          minW="300px"
        >
          <Box p="3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                <FormControl
                  isInvalid={errors.email ? true : false}
                  isRequired
                  variant="floating"
                >
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    mb="5"
                    _placeholder={{ color: textColor }}
                  />
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box my={2}>
                <FormControl
                  isInvalid={errors.password ? true : false}
                  isRequired
                  variant="floating"
                >
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="link"
                        aria-label={
                          isOpen ? 'Mask password' : 'Reveal password'
                        }
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                      />
                    </InputRightElement>
                    <Input
                      {...register('password')}
                      id="password"
                      name="password"
                      type={isOpen ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                      mb="2"
                      _placeholder={{ color: textColor }}
                    />
                    <FormLabel htmlFor="password">Password</FormLabel>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Center my={2}>
                <Button
                  mt={4}
                  w="full"
                  colorScheme="cyan"
                  isLoading={isSubmitting}
                  type="submit"
                  size="lg"
                  disabled={!canSubmit}
                  loadingText="Logging In"
                  variant={'outline'}
                  _hover={{
                    bg: 'cyan.600',
                    color: 'white',
                    scale: 1.1,
                  }}
                >
                  Submit
                </Button>
              </Center>
              <Center mb="8px">
                <Text color="gray.300">Or sign in with Google</Text>
              </Center>
              <Flex justify="center" flexDir={'column'}>
                <Box>
                  <Button
                    width="full"
                    onClick={googleSubmit}
                    disabled={googleLoading}
                    loadingText="Logging In"
                    variant="outline"
                    colorScheme="cyan"
                    size="lg"
                  >
                    <GoogleIcon boxSize="5" />
                  </Button>
                </Box>
                <Box>
                  <Center my="6px">
                    <Text mt="3px" mr="5px" color="gray.300">
                      Don't have an account?
                    </Text>
                    <Button
                      as={RouterLink}
                      variant="link"
                      colorScheme="cyan"
                      to={routes.REGISTER}
                    >
                      {' '}
                      Sign up
                    </Button>
                  </Center>
                  <Center>
                    <Button
                      mt="8px"
                      as={RouterLink}
                      variant="link"
                      colorScheme="cyan"
                      to={routes.FORGOT_PASSWORD}
                    >
                      {' '}
                      Forgot Password
                    </Button>
                  </Center>
                </Box>
              </Flex>
            </Form>
          </Box>
        </Box>
      </m.div>
    </Container>
  )
}
