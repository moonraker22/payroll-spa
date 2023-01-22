// import { useCallback, useEffect } from 'react'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  useColorModeValue,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, Link as RouterLink } from 'react-router-dom'
// import { DevTool } from '@hookform/devtools'
import { AvatarSchema, AvatarType } from '@/data/paySchema'
import { useSetAvatar } from '@/hooks/useSetAvatar'
import { routes } from '@/layout/routes'
import { useStore } from '@/stores/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as m } from 'framer-motion'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { RxUpdate } from 'react-icons/rx'

export default function Profile() {
  const defaultValues = {}

  const user = useStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AvatarType>({
    defaultValues,
    resolver: zodResolver(AvatarSchema),
  })
  const { setAvatar, isLoading, error } = useSetAvatar()
  const onSubmit: SubmitHandler<AvatarType> = (data) => {
    setAvatar({ avatarUrl: data.avatar })
  }

  const bg = useColorModeValue('white', ' gray.800')
  const color = useColorModeValue('gray.800', 'white')
  const placeholderColor = useColorModeValue('gray.400', 'gray.500')

  return (
    <Container p="10px" color="gray.300">
      <Center>
        <Heading
          as={m.h1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          mt={10}
          bgGradient="linear(to-b, #42047e, #07f49e)"
          bgClip="text"
          fontSize={['4xl', '4xl', '5xl']}
          fontWeight="extrabold"
        >
          Profile
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
          maxW="500px"
          minH="300px"
          minW="350px"
          // initial={{ opacity: 0, y: 80 }}
          // animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0 }}
        >
          <Stack spacing="10px">
            <Center mt="50px">
              <VisuallyHidden>
                <Image
                  src={user.avatar}
                  referrerPolicy="no-referrer"
                  alt="avatar"
                />
              </VisuallyHidden>
              <Avatar
                size="xl"
                name={user.userEmail}
                src={user.avatar}
                referrerPolicy="no-referrer"
              >
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
                color={color}
              >
                {user.userEmail}
              </Heading>
            </Center>
            <Center mt="20px">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                  isInvalid={errors.avatar?.message ? true : false}
                  variant="floating"
                >
                  <HStack spacing="10px" mt="5">
                    <Box>
                      <Input {...register('avatar')} placeholder="Avatar" />
                      <FormLabel
                        htmlFor="avatar"
                        placeholder="Avatar URL"
                        // sx={{ color: color }}
                        _placeholder={{ color: placeholderColor }}
                      >
                        Avatar URL
                      </FormLabel>
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
                        rightIcon={<RxUpdate />}
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
            <Center>
              <VStack mt="10px" w="330px" my="auto" spacing={5}>
                <Button
                  w="full"
                  colorScheme="cyan"
                  variant="outline"
                  as={RouterLink}
                  to={routes.CHANGE_EMAIL}
                  _hover={{
                    bg: 'cyan.600',
                    color: 'white',
                    scale: 1.1,
                  }}
                  rightIcon={<AiOutlineMail />}
                >
                  Change Email
                </Button>

                <Button
                  mt="10px"
                  w="full"
                  colorScheme="cyan"
                  variant="outline"
                  as={RouterLink}
                  to={routes.PASSWORD_RESET}
                  _hover={{
                    bg: 'cyan.600',
                    color: 'white',
                    scale: 1.1,
                  }}
                  rightIcon={<RiLockPasswordLine />}
                >
                  Change Password
                </Button>
              </VStack>
            </Center>
          </Stack>
        </Center>
      </m.div>
      {/* <DevTool control={control} /> */}
    </Container>
  )
}
