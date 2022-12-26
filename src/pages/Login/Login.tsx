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
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Login as LoginResolver } from '../../data/paySchema'
import { useEffect } from 'react'
import useStore from '../../stores/payStore'
import { useAuth } from '../../stores/payStore'

type RegistrationInputs = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
  } = useForm<RegistrationInputs>({
    resolver: zodResolver(LoginResolver),
  })

  const bg = useColorModeValue('white', ' gray.800')
  const password = watch('password')
  const email = watch('email')
  const canSubmit = isDirty && isValid && password && email
  const navigate = useNavigate()
  const { loginUser } = useStore()
  console.log(useAuth())

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    try {
      const res = loginUser(data.email, data.password)
      console.log(res)
      // navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setFocus('email')
  }, [])

  return (
    <Container maxW="container.xl" centerContent mt={10}>
      <Box
        bg={bg}
        border="2px"
        borderColor="gray.700"
        boxShadow="dark-lg"
        p="4"
        rounded="md"
        mt={10}
        mb={10}
        w="60vw"
      >
        <Center>
          <Text
            bgGradient="linear(to-b, green.200, pink.500)"
            bgClip="text"
            fontSize={['3xl', '4xl', '5xl']}
            fontWeight="extrabold"
          >
            Login
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
                Need an account Sign Up
              </Link>
            </Center>
          </Form>
        </Box>
      </Box>
    </Container>
  )
}
