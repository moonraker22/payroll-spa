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
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Login as LoginResolver } from '../../data/paySchema'
import { useEffect, useRef } from 'react'
// import useStore from '@/stores/payStore'
import { useLogin } from '../../hooks/useAuth'
import { HiEye, HiEyeOff } from 'react-icons/hi'

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
  // const { loginUser } = useStore()
  const { login, isLoading, error } = useLogin()

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
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
  return (
    <Container maxW="container.xl" centerContent mt={10}>
      <Center mt={10}>
        <Heading
          mt="10"
          as="h1"
          bgGradient="linear(to-b, green.200, pink.500)"
          bgClip="text"
          fontSize={['4xl', '4xl', '5xl']}
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
        maxW="500px"
        minW="300px"
      >
        <Box p="3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <FormControl isInvalid={errors.email ? true : false} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box my={2}>
              <FormControl
                isInvalid={errors.password ? true : false}
                isRequired
              >
                <FormLabel htmlFor="password">Password</FormLabel>

                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant="link"
                      aria-label={isOpen ? 'Mask password' : 'Reveal password'}
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
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Center my={2}>
              <Button
                my={4}
                w="full"
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                size="lg"
                disabled={!canSubmit}
                loadingText="Logging In"
              >
                Submit
              </Button>
            </Center>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="teal">
                Sign up
              </Button>
            </HStack>
          </Form>
        </Box>
      </Box>
    </Container>
  )
}
