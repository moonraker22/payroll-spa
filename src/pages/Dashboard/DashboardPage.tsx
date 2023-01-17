import { Link as RouterLink, useParams } from 'react-router-dom'
import {
  Box,
  Avatar,
  Center,
  Stack,
  GridItem,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Divider,
  Button,
  AvatarBadge,
  Image,
  VisuallyHidden,
  HStack,
  Icon,
  Text,
  Link,
  Flex,
  Spacer,
  Wrap,
  WrapItem,
  chakra,
} from '@chakra-ui/react'
import { WeekDisplay } from './WeekDisplay'
import { routes } from '@/lib/routes'
import { Suspense, useEffect, useState } from 'react'
import { store, useSnapshot } from '@/stores/store'
import { useGetWeeklyTotals } from '@/hooks/useGetWeeklyTotals'
import SpinnerComp from '@/components/SpinnerComp'
import { TbArrowBigLeftLines, TbArrowBigRightLines } from 'react-icons/tb'
import { animate, motion as m } from 'framer-motion'
import { auth } from '@/firebase'
import PaginatedItems from './PaginatedItems'
import FilterField from './FilterField'
import { WeeksType } from '@/stores/store'

export default function Dashboard() {
  // const { id } = useParams<{ id: string }>()
  const snap = useSnapshot(store)

  const { weeks, totals, totalsLoading } = useGetWeeklyTotals()

  const bg = useColorModeValue('white', ' gray.800')

  const container = {
    hidden: { x: 0, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: [0.8, 1, 1.2, 1.4, 1.2, 1],
      transition: {
        type: 'spring',
        stiffness: 90,
        delay: 0.2,
        damping: 15,
        delayChildren: 0.5,
        staggerDirection: -1,
        staggerChildren: 0.4,
      },
    },
  }
  const items = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  // const items = {
  //   hidden: { opacity: 0 },
  //   show: { opacity: 1 },
  // }

  return (
    <>
      <Suspense
        fallback={
          <div>
            <SpinnerComp />
          </div>
        }
      >
        <SimpleGrid columns={[1, null, 3]} spacing="10px">
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
                <Text fontSize="lg" fontWeight="extrabold" ml="20px">
                  Here is where you will see your weekly totals. To get started
                  click the DailyForm button on top or go{' '}
                  <Link as={RouterLink} to={routes.DAILY} color="cyan.600">
                    here
                  </Link>
                </Text>
              ) : null}
              <PaginatedItems itemsPerPage={4} />
            </Box>
          </GridItem>
          <GridItem w="100%" h="500px" bg={bg}>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'spring', stiffness: 90, delay: 0.5 }}
              exit={{ opacity: 0 }}
            >
              <Stack spacing="10px">
                <Center mt="50px">
                  <Avatar
                    size="2xl"
                    my="auto"
                    mx="200px"
                    name={snap.userEmail}
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
                  <Heading as="h3" fontSize="xl" fontWeight="extrabold">
                    {snap.userEmail}
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
                    boxShadow="lg"
                  >
                    Edit Profile
                  </Button>
                </Center>
              </Stack>
            </m.div>
          </GridItem>
        </SimpleGrid>
      </Suspense>
    </>
  )
}

// export async function loader({ request }) {
//   let displayName, email, photoURL, emailVerified, uid
//   const user = auth.currentUser
//   if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     displayName = user.displayName
//     email = user.email
//     photoURL = user.photoURL
//     emailVerified = user.emailVerified

//     // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
//     uid = user.uid
//   }
//   return {
//     props: {
//       user,
//     },
//   }
// }
