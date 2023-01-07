import { useCallback, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Form, useLocation, Link as RouterLink } from 'react-router-dom'
import {
  Button,
  Box,
  Center,
  useColorModeValue,
  Heading,
  Card,
  Container,
  Avatar,
  AvatarBadge,
  Divider,
  Stack,
} from '@chakra-ui/react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Paysheet } from '@/data/paySchema'
import { useAddPay } from '@/hooks/usePay'
import { routes } from '@/lib/routes'
import { store, useSnapshot } from '@/stores/store'
import { motion as m } from 'framer-motion'

export default function Profile() {
  const onSubmit = () => {}
  const defaultValues = {}

  const user = useSnapshot(store)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
    control,
    reset,
    getValues,
    setValue,
    setFocus,
  } = useForm<ProfileInputs>({
    defaultValues,
    resolver: zodResolver(Paysheet),
  })

  const bg = useColorModeValue('white', ' gray.800')

  return (
    <Container p="10px">
      <Center>
        <Heading
          as={m.h1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          mt={10}
          // bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgGradient="linear(to-b, #42047e, #07f49e)"
          // bgGradient="linear(to-r, teal, red.500)"
          bgClip="text"
          fontSize={['4xl', '4xl', '5xl']}
          fontWeight="extrabold"
        >
          Profile
        </Heading>
      </Center>
      <Center
        as={m.div}
        bg={bg}
        border="2px"
        borderColor="cyan.700"
        boxShadow="dark-lg"
        p="4"
        rounded="md"
        mt="50px"
        mb={10}
        // bgGradient="linear(to-l, #111621, #1A202C)"
        maxW="500px"
        minW="200px"
        minH="300px"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', stiffness: 90, delay: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <Stack spacing="10px">
            <Center mt="50px">
              <Avatar size="2xl" my="auto" mx="200px" name={user.userEmail}>
                <AvatarBadge boxSize="1.25em" bg="cyan.700" />
              </Avatar>
            </Center>
            <Divider orientation="horizontal" />
            <Center mt="20px">
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="extrabold"
                // color={'black'}
              >
                {user.userEmail}
              </Heading>
            </Center>
            <Center mt="20px">
              <Button
                colorScheme="cyan"
                variant="outline"
                as={RouterLink}
                to={routes.PROFILE}
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
              >
                Change Password
              </Button>
            </Center>
          </Stack>
        </m.div>
      </Center>
      {/* <DevTool control={control} /> */}
    </Container>
  )
}

type ProfileInputs = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
