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
  HStack,
  Heading,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordResetSchema, PasswordResetType } from '@/data/paySchema'
import { motion as m } from 'framer-motion'
import { useEffect } from 'react'
import { useRegister } from '../../hooks/useAuth'

// type PasswordResetType = {
//   password: string
//   passwordConfirmation: string
// }

export default function PasswordReset() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setFocus,
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
  } = useForm<PasswordResetType>({
    resolver: zodResolver(PasswordResetSchema),
  })
  const navigate = useNavigate()

  const { register: registerUser, isLoading } = useRegister()

  const onSubmit: SubmitHandler<PasswordResetType> = async (data) => {
    try {
      console.log(data)

      //   registerUser({ email: data.email, password: data.password })
      // navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setFocus('password')
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
      <Center>
        <Heading
          mt="10"
          as={m.h1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          bgGradient="linear(to-b, #42047e, #07f49e)"
          bgClip="text"
          fontSize={['3xl', '3xl', '4xl']}
          fontWeight="extrabold"
        >
          Password Reset
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
        // bgGradient="linear(to-l, #111621, #1A202C)"
        w="50vw"
        maxW="500px"
        minW="300px"
      >
        <Box p="3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box my={2}>
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
                  autoComplete="new-password"
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my={2}>
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
                  autoComplete="new-password"
                />
                <FormErrorMessage>
                  {errors.passwordConfirmation &&
                    errors.passwordConfirmation.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Center my={2}>
              <Button
                my={4}
                w="full"
                colorScheme="cyan"
                isLoading={isSubmitting}
                type="submit"
                size="lg"
                disabled={!canSubmit}
                variant="outline"
              >
                Submit
              </Button>
            </Center>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Button variant="link" colorScheme="cyan">
                Log in
              </Button>
            </HStack>
          </Form>
        </Box>
      </Box>
    </Container>
  )
}
