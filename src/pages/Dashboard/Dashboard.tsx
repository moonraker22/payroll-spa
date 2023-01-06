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
  AvatarBadge,
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
import SpinnerComp from '../../components/SpinnerComp'
import { motion as m } from 'framer-motion'

export default function Dashboard() {
  const user = useSnapshot(store)

  useGetWeeklyTotals()

  const bg = useColorModeValue('white', ' gray.800')

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
                  initial={{ x: -800, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 90, delay: 0.2 }}
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
