import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Flex,
  AbsoluteCenter,
  Avatar,
  Center,
  Stack,
  Grid,
  GridItem,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Divider,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Button,
  Show,
  Hide,
} from '@chakra-ui/react'
import { WeekDisplay } from './WeekDisplay'
import { useAuth } from '@/hooks/useAuth'
import { useIdToken } from 'react-firebase-hooks/auth'
import { auth } from '@/firebaseConf'
import { routes } from '../../lib/routes'
import { background, returnPaysheetString } from '@/lib/constants'
import {
  useCollection,
  useCollectionOnce,
} from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '@/firebaseConf'
import { Suspense, useEffect, useRef, useState } from 'react'
import { store, useSnapshot, snapshot } from '@/stores/store'
import { useGetWeeklyTotals } from '@/hooks/useGetWeeklyTotals'
import { getWeeklyTotals } from '@/lib/utils'

export default function Dashboard() {
  // const [idToken, loading, error] = useIdToken(auth)
  const user = useSnapshot(store)
  // const [payState, setPayState]: any = useState([])

  // const q = query(collection(db, `users`, `${user?.userId}`, 'paysheets'))

  // const [paysheets, loadingPaysheets, errorPaysheets]: any =
  //   useCollectionOnce(q)

  // const loadedOnce = useRef(false)
  // console.log(loadedOnce, 'loadedOnce.current')

  // useEffect(() => {
  //   if (!loadingPaysheets && loadedOnce.current === false) {
  //     const sheets = paysheets.docs.map((doc) => doc.data())
  //     const test = getWeeklyTotals(sheets)
  //     if (!loadedOnce) {
  //       for (let t of test) {
  //         store.paysheets.push(t)
  //       }
  //       loadedOnce.current = true
  //       console.log(loadedOnce, 'loadedOnce.current')
  //     }
  //     console.log(user, 'user.paysheets')
  //   }
  // }, [loadingPaysheets])

  const { totals, totalsLoading, totalsError } = useGetWeeklyTotals()
  // console.log(totals, 'totals')

  // totals.map((t) => console.log(t.backhaul, 'totals'))
  // console.log(totals, 'totals')

  // console.log(user.paysheets, 'user.paysheets')
  // console.log(totalsLoading, 'totalsLoading')

  const bg = useColorModeValue(background.light, background.dark)
  // const sortedWeeks = []
  // sortedWeeks.push(...store.weeks)
  // const t = sortedWeeks.sort((a, b) => {
  //   const start = Date.parse(a.weekStart)
  //   const end = Date.parse(b.weekStart)

  //   return start - end
  // })
  // console.log(t, 't')

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SimpleGrid columns={[1, null, 3]} spacing="10px">
          <GridItem w="100%" h="100%" bg={bg} colSpan={2}>
            <Heading
              as="h1"
              fontSize="5xl"
              fontWeight="extrabold"
              mt="50px"
              ml="20px"
              mb="40px"
              textAlign={'center'}
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
                <WeekDisplay
                  key={index}
                  totalMiles={week.totalMiles}
                  totalPay={week.totalPay}
                  totalBackHaulPay={week.backhaul}
                  weekStartDate={Date.parse(week?.weekStart).toString()}
                  weekEndDate={Date.parse(week?.weekEnd).toString()}
                />
              ))}
            </Box>
          </GridItem>
          <GridItem w="100%" h="500px" bg={bg}>
            <Stack spacing="10px">
              <Center mt="50px">
                <Avatar size="2xl" my="auto" mx="200px" name={user.userEmail} />
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
                  colorScheme="blue"
                  variant="outline"
                  as={RouterLink}
                  to={routes.PROFILE}
                >
                  Edit Profile
                </Button>
              </Center>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Suspense>
    </>
  )
}

const weekData = [
  {
    totalMiles: 0,
    totalPay: 0,
    totalBackHaulPay: 0,
    weekStartDate: '01/01/2021',
    weekEndDate: '01/07/2021',
  },
  {
    totalMiles: 0,
    totalPay: 0,
    totalBackHaulPay: 0,
    weekStartDate: '01/08/2021',
    weekEndDate: '01/14/2021',
  },
  {
    totalMiles: 0,
    totalPay: 0,
    totalBackHaulPay: 0,
    weekStartDate: '01/15/2021',
    weekEndDate: '01/21/2021',
  },
  {
    totalMiles: 0,
    totalPay: 0,
    totalBackHaulPay: 0,
    weekStartDate: '01/22/2021',
    weekEndDate: '01/28/2021',
  },
  {
    totalMiles: 0,
    totalPay: 0,
    totalBackHaulPay: 0,
    weekStartDate: '01/29/2021',
    weekEndDate: '02/04/2021',
  },
  {
    totalMiles: 0,
    totalPay: 0,
    totalBackHaulPay: 0,
    weekStartDate: '02/05/2021',
    weekEndDate: '02/11/2021',
  },
  {
    totalMiles: 0,
    totalPay: 0,
    totalBackHaulPay: 0,
    weekStartDate: '02/12/2021',
    weekEndDate: '02/18/2021',
  },
]
