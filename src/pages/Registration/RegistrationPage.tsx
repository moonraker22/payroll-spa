import { Register } from '@/data/paySchema'
import { useRegister } from '@/hooks/useAuth'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import { routes } from '@/lib/routes'
import {
  Box,
  Button,
  Center,
  Container,
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
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { store } from '../../stores/store'
import { GoogleIcon } from '../Login/GoogleIcon'

type RegistrationInputs = {
  email: string
  password: string
  passwordConfirmation: string
}

export default function Registration() {
  const snap = useSnapshot(store)

  const navigate = useNavigate()

  useEffect(() => {
    if (snap.userId) {
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
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
  } = useForm<RegistrationInputs>({
    resolver: zodResolver(Register),
  })

  const { register: registerUser, isLoading } = useRegister()

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    try {
      registerUser({ email: data.email, password: data.password })
      // navigate('/')
    } catch (error) {
      console.log(error)
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

  const passwordMatch = (value: string) => {
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

  const googleSubmit = async () => {
    try {
      googleLogin()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxW="container.xl" centerContent mt={5}>
      <m.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
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
        <Box
          bg={bg}
          border="2px"
          borderColor="gray.700"
          boxShadow="dark-lg"
          p="5"
          rounded="md"
          mt={10}
          mb={10}
          w="50vw"
          maxW="450px"
          minW="300px"
        >
          <Box p="3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Box my={2}>
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
                    _placeholder={{ color: placeholderColor }}
                  />
                  <FormLabel htmlFor="email">Email:</FormLabel>
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
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box my={2}>
                <FormControl
                  isInvalid={errors.passwordConfirmation ? true : false}
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
                    {errors.passwordConfirmation &&
                      errors.passwordConfirmation.message}
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
    </Container>
  )
}
