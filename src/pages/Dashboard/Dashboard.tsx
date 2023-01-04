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
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '@/firebaseConf'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user } = useAuth()
  const [idToken, loading, error] = useIdToken(auth)
  // console.log(user)

  // useEffect(() => {
  //   if (user?.id) {
  //     console.log(user.id)
  //     const q = query(collection(db, `users`, `${user.id}`, 'paysheets'))

  //     const [paysheets, loadingPaysheets, errorPaysheets] = useCollection(q)
  //     console.log(paysheets)
  //   }
  // }, [user.id])
  // console.log(user)

  const bg = useColorModeValue(background.light, background.dark)
  return (
    <>
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
            {weekData.map((week, index) => (
              <WeekDisplay
                key={index}
                totalMiles={week.totalMiles}
                totalPay={week.totalPay}
                totalBackHaulPay={week.totalBackHaulPay}
                weekStartDate={week.weekStartDate}
                weekEndDate={week.weekEndDate}
              />
            ))}
          </Box>
        </GridItem>
        <GridItem w="100%" h="500px" bg={bg}>
          <Stack spacing="10px">
            <Center mt="50px">
              <Avatar size="2xl" my="auto" mx="200px" name={idToken.email} />
            </Center>
            <Divider orientation="horizontal" />
            <Center mt="20px">
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="extrabold"
                // color={'black'}
              >
                {idToken.email}
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
