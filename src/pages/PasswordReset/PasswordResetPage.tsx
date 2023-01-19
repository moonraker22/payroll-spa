import { PasswordResetSchema, PasswordResetType } from '@/data/paySchema'
import { auth } from '@/firebase'
import { store } from '@/stores/store'
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { usePasswordReset } from '@/hooks/usePasswordReset'
import SlideIn from '@/pages/PasswordReset/SlideIn'
import { routes } from '../../lib/routes'

export default function PasswordReset() {
  const [isGoogle, setIsGoogle] = useState(false)
  const user = useSnapshot(store)
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

  const { passwordResetEmail, confirmPassReset, updatePass, loading, error } =
    usePasswordReset()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit: SubmitHandler<PasswordResetType> = async (data) => {
    try {
      await updatePass(data.password, data.currentPassword)
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

  const isAuthenticatedWithGoogle = () => {
    const user = auth?.currentUser
    if (user !== null) {
      if (user?.providerData[0]?.providerId === 'google.com') {
        return true
      }
    }
    return false
  }

  const canSubmit =
    !isAuthenticatedWithGoogle() &&
    isDirty &&
    isValid &&
    password === passwordConfirmation

  useEffect(() => {
    setIsGoogle(isAuthenticatedWithGoogle())
  }, [])

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
          Update Password
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
        maxW="500px"
        minW="350px"
      >
        <Box p="3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box my={2}>
              <input
                type="hidden"
                name="email"
                value={user.userEmail}
                autoComplete="username"
              />
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
                  mb="3"
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
                  mb="3"
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
            <Box my={2}>
              <FormControl
                isInvalid={errors.currentPassword ? true : false}
                isRequired
                variant="floating"
              >
                <Input
                  {...register('currentPassword')}
                  id="currentPassword"
                  type="password"
                  placeholder="Current Password"
                  autoComplete="new-password"
                  mb="1"
                />
                <FormLabel htmlFor="currentPassword">
                  Current Password:
                </FormLabel>
                <FormErrorMessage>
                  {errors.currentPassword && errors.currentPassword.message}
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
              <Text color="muted">Go back to</Text>
              <Button
                as={RouterLink}
                to={routes.DASHBOARD}
                variant="link"
                colorScheme="cyan"
              >
                Dashboard
              </Button>
            </HStack>
          </Form>
        </Box>
      </Box>
      <SlideIn isGoogle={isGoogle} />
    </Container>
  )
}
