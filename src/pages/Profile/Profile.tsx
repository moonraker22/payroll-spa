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
  Input,
  HStack,
  FormLabel,
  Image,
  VisuallyHidden,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { AvatarSchema, AvatarType } from '@/data/paySchema'
import { useSetAvatar } from '@/hooks/useSetAvatar'
import { routes } from '@/lib/routes'
import { store, useSnapshot } from '@/stores/store'
import { motion as m } from 'framer-motion'

export default function Profile() {
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
  } = useForm<AvatarType>({
    defaultValues,
    resolver: zodResolver(AvatarSchema),
  })
  const { setAvatar, isLoading, error } = useSetAvatar()
  const onSubmit: SubmitHandler<AvatarType> = (data) => {
    console.log(data)

    setAvatar({ avatarUrl: data.avatar })
    console.log(error, isLoading)
  }

  const bg = useColorModeValue('white', ' gray.800')

  return (
    <Container p="10px" color="gray.300">
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
        p="5"
        rounded="md"
        mt="50px"
        mb="100px"
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
              <Avatar
                size="xl"
                name={user.userEmail}
                src={user.avatar}
                referrerPolicy="no-referrer"
              >
                <AvatarBadge boxSize="1.25em" bg="cyan.700" />
              </Avatar>
              <VisuallyHidden>
                <Image src={user.avatar} referrerPolicy="no-referrer" />
              </VisuallyHidden>
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
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.avatar?.message ? true : false}>
                  <HStack spacing="10px">
                    <FormLabel htmlFor="avatar" placeholder="Avatar URL">
                      Avatar URL
                    </FormLabel>
                    <Box>
                      <Input {...register('avatar')} placeholder="Avatar" />
                    </Box>

                    <Box>
                      <Button
                        type="submit"
                        colorScheme="cyan"
                        variant="outline"
                        _hover={{
                          bg: 'cyan.600',
                          color: 'white',
                          scale: 1.1,
                        }}
                      >
                        Update
                      </Button>
                    </Box>
                  </HStack>
                  <Center my="10px">
                    <FormErrorMessage>
                      {errors.avatar && errors.avatar?.message}
                    </FormErrorMessage>
                  </Center>
                </FormControl>
              </Form>
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
