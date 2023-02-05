import { ChangeEmailSchema, ChangeEmailType } from '@/data/paySchema'
import { auth } from '@/firebase'
import { useChangeEmail } from '@/hooks/useChangeEmail'
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
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, Link as RouterLink } from 'react-router-dom'

import SlideIn from '@/components/isGoogleSlideIn'
import { routes } from '@/layout/routes'

export default function PasswordReset() {
  const [isGoogle, setIsGoogle] = useState(false)
  // const user = useStore()
  const { changeEmail, error: changeEmailError } = useChangeEmail()

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
  } = useForm<ChangeEmailType>({
    resolver: zodResolver(ChangeEmailSchema),
  })

  const onSubmit: SubmitHandler<ChangeEmailType> = async (data) => {
    try {
      await changeEmail({
        email: data.email,
        password: data.password,
        newEmail: data.newEmail,
      })
    } catch (error: any) {
      console.error(error.message)
      console.error(error)
      console.error(changeEmailError)
    }
  }
  useEffect(() => {
    setFocus('password')
  }, [])

  const bg = useColorModeValue('white', ' gray.800')

  const isAuthenticatedWithGoogle = () => {
    const user = auth?.currentUser
    if (user !== null) {
      if (user?.providerData[0]?.providerId === 'google.com') {
        return true
      }
    }
    return false
  }

  const canSubmit = isDirty && isValid && !isSubmitting && !isGoogle

  useEffect(() => {
    setIsGoogle(isAuthenticatedWithGoogle())
  }, [])

  return (
    <Container maxW={{ base: '100%', sm: '95%' }} mt={8}>
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
          Update Email
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
          borderColor="gray.700"
          boxShadow="dark-lg"
          p="5"
          rounded="md"
          mt={10}
          mb={10}
          w="50vw"
          maxW="500px"
          minW="350px"
          mx="auto"
        >
          <Box p="3">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Box my={2}>
                <FormControl
                  isInvalid={errors.password ? true : false}
                  isRequired
                  variant="floating"
                >
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    mb="4"
                  />
                  <FormLabel htmlFor="email">Current Email</FormLabel>
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
                    placeholder="Password "
                    autoComplete="new-password"
                    mb="4"
                  />
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Box my={2}>
                <FormControl
                  isInvalid={errors.newEmail ? true : false}
                  isRequired
                  variant="floating"
                >
                  <Input
                    {...register('newEmail')}
                    id="newEmail"
                    type="email"
                    placeholder="New Email"
                    autoComplete="email"
                    // mb="1"
                  />
                  <FormLabel htmlFor="newEmail">New Email</FormLabel>
                  <FormErrorMessage>
                    {errors.newEmail && errors.newEmail.message}
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
      </m.div>
      <SlideIn isGoogle={isGoogle} />
    </Container>
  )
}
