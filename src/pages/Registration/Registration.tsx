import { useForm, SubmitHandler, Controller } from 'react-hook-form'
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
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Register } from '../../data/paySchema'
import useStore from '../../stores/payStore'
import { useEffect } from 'react'

type RegistrationInputs = {
  email: string
  password: string
  passwordConfirmation: string
}

export default function Registration() {
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
  const navigate = useNavigate()

  const { registerUser } = useStore()

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    try {
      registerUser(data.email, data.password)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setFocus('email')
  }, [])

  const bg = useColorModeValue('white', ' gray.800')

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

  return (
    <Container maxW="container.xl" centerContent mt={10}>
      <Box
        bg={bg}
        border="2px"
        borderColor="gray.700"
        boxShadow="dark-lg"
        p="5"
        rounded="md"
        mt={10}
        mb={10}
        // bgGradient="linear(to-l, #111621, #1A202C)"
        w="60vw"
      >
        <Center>
          <Text
            // bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgGradient="linear(to-b, green.200, pink.500)"
            // bgGradient="linear(to-r, teal, red.500)"
            bgClip="text"
            fontSize={['3xl', '4xl', '5xl']}
            fontWeight="extrabold"
          >
            Register
          </Text>
        </Center>
        <Divider mt={5} mb={5} />
        <Box>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <FormControl isInvalid={errors.email ? true : false} isRequired>
                <FormLabel htmlFor="email">Email:</FormLabel>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="Email"
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl
                isInvalid={errors.password ? true : false}
                isRequired
              >
                <FormLabel htmlFor="password">Password:</FormLabel>
                <Input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl
                isInvalid={errors.passwordConfirmation ? true : false}
                isRequired
              >
                <FormLabel htmlFor="passwordConfirmation">
                  Password Confirmation:
                </FormLabel>
                <Input
                  {...register('passwordConfirmation')}
                  id="passwordConfirmation"
                  type="password"
                  placeholder="Password Confirmation"
                />
                <FormErrorMessage>
                  {errors.passwordConfirmation &&
                    errors.passwordConfirmation.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Center mb={2}>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                size="lg"
                disabled={!canSubmit}
              >
                Submit
              </Button>
            </Center>
            <Center mb={2}>
              <Link as={RouterLink} to="/login">
                Already have an account log In
              </Link>
            </Center>
          </Form>
        </Box>
      </Box>
    </Container>
  )
}
