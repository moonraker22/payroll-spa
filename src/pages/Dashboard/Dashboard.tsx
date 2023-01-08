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
} from '@chakra-ui/react'
import { WeekDisplay } from './WeekDisplay'
import { routes } from '@/lib/routes'
import { Suspense, useEffect } from 'react'
import { store, useSnapshot } from '@/stores/store'
import { useGetWeeklyTotals } from '@/hooks/useGetWeeklyTotals'
import SpinnerComp from '@/components/SpinnerComp'
import { motion as m } from 'framer-motion'
import { auth } from '@/firebaseConf'

export default function Dashboard() {
  const { id } = useParams<{ id: string }>()

  const user = useSnapshot(store)

  const { weeks, totals, totalsLoading } = useGetWeeklyTotals()

  useEffect(() => {
    if (weeks.length > 0) {
      store.weeks = weeks
    }
  }, [weeks])

  const bg = useColorModeValue('white', ' gray.800')

  const container = {
    hidden: { x: -800, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
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
  const length = user.weeks.length
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
              // sx={{
              //   '@media screen and (max-width: 600px)': {
              //     // fontSize: '3xl',
              //     display: 'none',
              //   },
              // }}
            >
              Dashboard
            </Heading>

            <Box w="100%" h="100%" bg={bg} rounded={'lg'}>
              {user.weeks.map((week, index) => (
                <m.div
                  key={index}
                  initial={{ x: -0, opacity: 0, scale: 0.8 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: [0.8, 1, 1.2, 1.4, 1.2, 1],
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 90,
                    delay: index * 0.2,
                    damping: 15,
                  }}
                  // variants={container}
                  // initial="hidden"
                  // animate="visible"
                  exit={{ x: 800, opacity: 0 }}
                  whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.2 },
                    cursor: 'pointer',
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <WeekDisplay
                    // isLoading={totalsLoading}

                    totalMiles={week.totalMiles}
                    totalPay={week.totalPay}
                    totalBackHaulPay={week.backhaul}
                    weekStartDate={Date.parse(week?.weekStart).toString()}
                    weekEndDate={Date.parse(week?.weekEnd).toString()}
                  />
                </m.div>
              ))}
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
                    name={user.userEmail}
                    src={user.avatar}
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
