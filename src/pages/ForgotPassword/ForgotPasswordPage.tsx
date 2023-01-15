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
  Center,
  useColorModeValue,
  Heading,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { motion as m } from 'framer-motion'
import { routes } from '@/lib/routes'
import { store } from '@/stores/store'
import { useSnapshot } from 'valtio'
import { usePasswordReset } from '@/hooks/usePasswordReset'
import { EmailSchema, EmailType } from '@/data/paySchema'

export default function Login() {
  const snap = useSnapshot(store)
  const { passwordResetEmail } = usePasswordReset()

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
    setFocus,
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
  } = useForm<EmailType>({
    resolver: zodResolver(EmailSchema),
  })

  const bg = useColorModeValue('white', ' gray.800')

  const onSubmit: SubmitHandler<EmailType> = async (data) => {
    try {
      passwordResetEmail(data.email)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setFocus('email')
  }, [])

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
            fontSize={['3xl', '3xl', '4xl']}
            as={m.h1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            bgGradient="linear(to-b, #42047e, #07f49e)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Reset Password
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
                  />
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
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
                  //   disabled={!canSubmit}
                  disabled={!isDirty || !isValid || isSubmitting}
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
            </Form>
          </Box>
        </Box>
      </m.div>
    </Container>
  )
}
