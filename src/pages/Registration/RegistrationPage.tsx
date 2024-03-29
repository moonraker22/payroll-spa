import { Register, type RegisterType } from '@/data/paySchema'
import { useRegister } from '@/hooks/useAuth'
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
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as m } from 'framer-motion'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { Form, Link as RouterLink, useNavigate } from 'react-router-dom'
import { GoogleIcon } from '../Login/GoogleIcon'

// type RegistrationInputs = {
//   email: string
//   password: string
//   passwordConfirmation: string
// }

export default function Registration(): JSX.Element {
  const snap = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (snap.userId.length > 0) {
      navigate(routes.DASHBOARD)
    }
  }, [snap.userId])

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setFocus,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<RegisterType>({
    resolver: zodResolver(Register),
  })

  const { register: registerUser, error: registerError } = useRegister()

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    try {
      registerUser({ email: data.email, password: data.password }).catch(
        (error: unknown) => {
          console.error(error)
        }
      )
      // navigate('/')
    } catch (error: unknown) {
      console.error(error)
      console.error(registerError)
    }
  }
  useEffect(() => {
    setFocus('email')
  }, [])

  const bg = useColorModeValue('white', ' gray.800')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const placeholderColor = useColorModeValue('gray.400', 'gray.500')

  const password = watch('password')
  const passwordConfirmation = watch('passwordConfirmation')

  const passwordMatch: (value: string) => void = (value: string) => {
    if (password !== value) {
      setError('passwordConfirmation', {
        type: 'manual',
        message: 'Passwords should match!',
      })
    } else {
      clearErrors('passwordConfirmation')
    }
  }
  useEffect(() => {
    passwordMatch(passwordConfirmation)
  }, [password, passwordConfirmation])

  const canSubmit = isDirty && isValid && password === passwordConfirmation

  const {
    googleLogin,
    isLoading: googleLoading,
    error: googleError,
  } = useGoogleAuth()

  const googleSubmit: () => Promise<void> = async () => {
    try {
      googleLogin().catch((error: unknown) => {
        console.error(error)
      })
    } catch (error: unknown) {
      console.error(error)
      console.error(googleError)
    }
  }

  return (
    <Center maxW={{ base: '100%', sm: '95%' }} mt={8}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Center>
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
            Register
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
            p="5"
            rounded="md"
            mt={10}
            mb={10}
            w="50vw"
            maxW="450px"
            minW="350px"
          >
            <Box p="3">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Box my={2}>
                  <FormControl
                    isInvalid={errors.email != null}
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
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box my={2}>
                  <FormControl
                    isInvalid={errors.password != null}
                    isRequired
                    variant="floating"
                  >
                    <Input
                      {...register('password')}
                      id="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      mb="5"
                      _placeholder={{ color: placeholderColor }}
                    />
                    <FormLabel htmlFor="password">Password:</FormLabel>
                    <FormErrorMessage>
                      {errors.password?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box my={2}>
                  <FormControl
                    isInvalid={errors.passwordConfirmation != null}
                    isRequired
                    variant="floating"
                  >
                    <Input
                      {...register('passwordConfirmation')}
                      id="passwordConfirmation"
                      type="password"
                      placeholder="Password Confirmation"
                      autoComplete="new-password"
                      mb="2"
                      _placeholder={{ color: placeholderColor }}
                    />
                    <FormLabel htmlFor="passwordConfirmation">
                      Password Confirmation:
                    </FormLabel>
                    <FormErrorMessage>
                      {errors.passwordConfirmation?.message}
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
                    _disabled={{
                      color: 'cyan.300',
                    }}
                    rightIcon={<HiOutlinePencilAlt />}
                  >
                    Register
                  </Button>
                </Center>
                <Center mb="8px">
                  <Text color={textColor}>Or register in with Google</Text>
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
                      id="google-button"
                    >
                      <GoogleIcon boxSize="5" />
                    </Button>
                  </Box>
                  <Box>
                    <Center my="6px">
                      <Text mt="3px" mr="5px" color={textColor}>
                        Already have an account?
                      </Text>
                      <Button
                        as={RouterLink}
                        variant="link"
                        colorScheme="cyan"
                        to={routes.LOGIN}
                      >
                        {' '}
                        Log In
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
