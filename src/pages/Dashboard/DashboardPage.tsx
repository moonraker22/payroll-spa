import SpinnerComp from '@/components/SpinnerComp'
import { routes } from '@/layout/routes'
import { useStore } from '@/stores/store'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  GridItem,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { LayoutGroup, motion as m } from 'framer-motion'
import { Suspense } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { TiLightbulb } from 'react-icons/ti'
import { Link as RouterLink } from 'react-router-dom'
import FilterField from './FilterField'
import PaginatedItems from './PaginatedItems'
import PeoplenetLogin from './PeoplenetLogin'
import PepsiLinks from './PepsiLinks'
import PTOCount from './PTOCount'

export default function Dashboard(): JSX.Element {
  // const { id } = useParams<{ id: string }>()
  const snap = useStore()

  const bg = useColorModeValue('white', ' gray.800')
  const color = useColorModeValue('gray.800', 'cyan.600')

  return (
    <>
      <Suspense
        fallback={
          <div>
            <SpinnerComp />
          </div>
        }
      >
        <SimpleGrid columns={[1, null, 3]} spacing="10px" p="5px">
          <LayoutGroup>
            <GridItem w="100%" h="100%" bg={bg} colSpan={2} p={'5'}>
              <Heading
                as={m.h1}
                fontSize={['4xl', '4xl', '5xl']}
                fontWeight="extrabold"
                mt="50px"
                ml="20px"
                mb="40px"
                textAlign={'center'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                bgGradient="linear(to-b, #42047e, #07f49e)"
                bgClip="text"
              >
                Dashboard
              </Heading>
              <FilterField />
              <Box w="100%" h="100%" bg={bg}>
                {snap.weeks.length === 0 ? (
                  <Container mt="30px">
                    <Text fontSize="lg" fontWeight="extrabold" ml="20px">
                      <Icon as={TiLightbulb} w={4} h={4} /> Here is where you
                      will see your weekly totals. To get started click the
                      DailyForm button on top or go{' '}
                      <Link as={RouterLink} to={routes.DAILY} color="cyan.600">
                        here
                      </Link>
                    </Text>
                  </Container>
                ) : (
                  <Text
                    fontSize={['sm', 'lg', 'lg']}
                    textAlign={'center'}
                    color="gray.400"
                  >
                    <Icon
                      as={TiLightbulb}
                      w={{ base: 3, md: 4 }}
                      h={{ base: 3, md: 4 }}
                    />{' '}
                    Click a box to see a breakdown of the week
                  </Text>
                )}
                <PaginatedItems itemsPerPage={5} />
              </Box>
            </GridItem>
            <GridItem w="100%" h="100%" bg={bg}>
              <m.div
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  delay: 0.5,
                  damping: 15,

                  duration: 0.7,
                }}
                exit={{ opacity: 0 }}
              >
                <Stack spacing="10px">
                  <Center mt="50px">
                    <Avatar
                      size="2xl"
                      my="auto"
                      mx="200px"
                      name={snap.displayName ?? snap.userEmail}
                      src={snap.avatar}
                    >
                      <AvatarBadge boxSize="1.25em" bg="cyan.700" />
                    </Avatar>
                    <VisuallyHidden>
                      <Image
                        src={snap.avatar}
                        referrerPolicy="no-referrer"
                        alt="avatar"
                      />
                    </VisuallyHidden>
                  </Center>
                  <Divider orientation="horizontal" />
                  <Center mt="20px" overflow={'hidden'}>
                    <Heading
                      as="h3"
                      fontSize="xl"
                      fontWeight="extrabold"
                      color={color}
                    >
                      {snap.displayName ?? snap.userEmail}
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
                      rightIcon={<AiOutlineEdit />}
                      boxShadow="lg"
                    >
                      Edit Profile
                    </Button>
                  </Center>
                  <Box mt="20px" p="10px">
                    <Center mt="20px">
                      <PTOCount />
                    </Center>
                  </Box>
                  <PeoplenetLogin />
                  <PepsiLinks />
                </Stack>
              </m.div>
            </GridItem>
          </LayoutGroup>
        </SimpleGrid>
      </Suspense>
    </>
  )
}
