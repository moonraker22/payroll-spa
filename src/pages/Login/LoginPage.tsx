import { Login as LoginResolver, type LoginType } from '@/data/paySchema'
import { useLogin } from '@/hooks/useAuth'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import { routes } from '@/layout/routes'
import { useStore } from '@/stores/store'
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as m } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { AiOutlineLogin } from 'react-icons/ai'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Form, Link as RouterLink, useNavigate } from 'react-router-dom'
import { GoogleIcon } from './GoogleIcon'

export default function Login(): JSX.Element {
  const snap = useStore()

  const navigate = useNavigate()
  const textColor: 'gray.200' | 'gray.800' = useColorModeValue(
    'gray.800',
    'gray.200'
  )
  const placeholderColor: 'gray.400' | 'gray.500' = useColorModeValue(
    'gray.400',
    'gray.500'
  )
  const bg: 'white' | ' gray.800' = useColorModeValue('white', ' gray.800')

  useEffect(() => {
    if (snap.userId.length > 0) {
      navigate(routes.DASHBOARD)
    }
  }, [snap.userId])

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginResolver),
  })

  const password: string = watch('password')
  const email: string = watch('email')
  const canSubmit: boolean =
    isDirty && isValid && password.length > 0 && email.length > 0
  const { login, error: loginError } = useLogin()

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      login({ email: data.email, password: data.password }).catch((err) => {
        console.error(err)
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
        console.error(error)
        console.error(loginError)
      }
      console.error(error)
      console.error(loginError)
    }
  }
  useEffect(() => {
    setFocus('email')
  }, [])
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickReveal: () => void = () => {
    onToggle()
    if (inputRef.current != null) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  const {
    googleLogin,
    isLoading: googleLoading,
    error: googleError,
  } = useGoogleAuth()

  const googleSubmit: () => Promise<void> = async () => {
    try {
      googleLogin().catch((err) => {
        console.error(err)
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
        console.error(error)
        console.error(googleError)
      }
      console.error(googleError)
      console.error(error)
    }
  }

  return (
    <Center maxW={{ base: '100%', sm: '95%' }} mt={8}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
        <m.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: [0.9, 1.2, 1] }}
          transition={{
            type: 'spring',
            stiffness: 90,

            damping: 15,
          }}
          exit={{ opacity: 0 }}
        >
          <Box
            bg={bg}
            border="2px"
            borderColor="cyan.600"
            boxShadow="dark-lg"
            p="6"
            rounded="md"
            mt={10}
            mb={10}
            w="50vw"
            maxW="450px"
            minW="350px"
          >
            <Box p="3">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={2}>
                  <FormControl
                    isInvalid={Boolean(errors.email)}
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
                      _placeholder={{ color: placeholderColor }}
                    />
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box my={2}>
                  <FormControl
                    isInvalid={Boolean(errors.password)}
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
                        _placeholder={{ color: placeholderColor }}
                      />
                      <FormLabel htmlFor="password">Password</FormLabel>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.password?.message}
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
                    disabled={!canSubmit || isSubmitting}
                    loadingText="Logging In"
                    variant={'outline'}
                    _hover={{
                      bg: 'cyan.600',
                      color: 'white',
                      scale: 1.1,
                    }}
                    _disabled={{
                      color: 'cyan.300',
                    }}
                    rightIcon={<AiOutlineLogin />}
                  >
                    Submit
                  </Button>
                </Center>
                <Center mb="8px">
                  <Text color={textColor}>Or sign in with Google</Text>
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
                      <Text mt="3px" mr="5px" color={textColor}>
                        Don&apos;t have an account?
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
      </m.div>
    </Center>
  )
}
