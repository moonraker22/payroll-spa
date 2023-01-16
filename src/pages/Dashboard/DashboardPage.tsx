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
import ReactPaginate from 'react-paginate'
import PaginatedItems from './PaginatedItems'

export default function Dashboard() {
  const { id } = useParams<{ id: string }>()
  const snap = useSnapshot(store)
  const [paginateLength, setPaginateLength] = useState<number>(
    Math.ceil(snap.weeks.length / 4)
  )
  const [currentPage, setCurrentPage] = useState([])
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [currentWeeks, setCurrentWeeks] = useState([])

  // useEffect(() => {
  //   if (snap.weeks.length > 0) {
  //     setCurrentWeeks(snap.weeks.slice(0, currentPageNum * 4))
  //     console.log(
  //       '🚀 ~ file: DashboardPage.tsx:43 ~ useEffect ~ setCurrentWeeks',
  //       currentWeeks
  //     )
  //   }
  // }, [snap.weeks])

  // const handlePaginate = (page: number) => {
  //   setCurrentWeeks(snap.weeks.slice(page * 4, page * 4 + 4))
  //   setCurrentPageNum(page)
  //   console.log(currentWeeks, 'current weeks')
  //   console.log(currentPageNum, 'current page num')
  //   console.log(currentPage, 'current page')
  //   console.log(paginateLength, 'paginate length')
  // }

  const { weeks, totals, totalsLoading } = useGetWeeklyTotals()

  // useEffect(() => {
  //   if (weeks.length > 0) {
  //     store.weeks = weeks
  //   }
  // }, [weeks])

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
              {/* {snap.weeks.map((week, index) => (
                <m.div
                  // as={m.div}
                  key={week.weekStart}
                  initial={{ x: -0, opacity: 0, scale: 0.8 }}
                  animate={{
                    x: 0,
                    opacity: 0.9,
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
                  // exit={{ x: 800, opacity: 0 }}
                  // whileHover={{
                  //   scale: 1.02,
                  //   transition: { duration: 0.2 },
                  //   cursor: 'pointer',
                  // }}
                  whileHover={{ cursor: 'pointer', opacity: 1 }}
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
              ))} */}
              {/* <Center>
                <HStack>
                  <Icon as={TbArrowBigLeftLines} />
                  {Array.from(Array(paginateLength).keys()).map((i) => (
                    <Button
                      key={i}
                      colorScheme="cyan"
                      variant="outline"
                      _hover={{
                        bg: 'cyan.600',
                        color: 'white',
                        scale: 1.1,
                      }}
                      onClick={() => handlePaginate(i)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Icon as={TbArrowBigRightLines} />
                </HStack>
              </Center> */}
              <PaginatedItems itemsPerPage={2} />
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
                    <Image src={snap.avatar} referrerPolicy="no-referrer" />
                  </VisuallyHidden>
                </Center>
                <Divider orientation="horizontal" />
                <Center mt="20px" overflow={'hidden'}>
                  <Heading
                    as="h3"
                    fontSize="xl"
                    fontWeight="extrabold"
                    // color={'black'}
                  >
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

// function PaginatedItems({ itemsPerPage }) {
//   const [itemOffset, setItemOffset] = useState(0)
//   const snap = useSnapshot(store)

//   const endOffset = itemOffset + itemsPerPage
//   const currentItems = snap.weeks.slice(itemOffset, endOffset)

//   const pageCount = Math.ceil(snap.weeks.length / itemsPerPage)
//   const mapArray = Array.from(Array(pageCount).keys())

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % snap.weeks.length
//     setItemOffset(newOffset)
//   }

//   const handlePrevClick = () => {
//     const newOffset = (itemOffset - itemsPerPage) % snap.weeks.length
//     setItemOffset(newOffset)
//   }

//   const handleNextClick = () => {
//     const newOffset = (itemOffset + itemsPerPage) % snap.weeks.length
//     setItemOffset(newOffset)
//   }
//   return (
//     <>
//       {currentItems.map((week, index) => (
//         <m.div
//           // as={m.div}
//           key={week.weekStart}
//           initial={{ x: -0, opacity: 0, scale: 0.8 }}
//           animate={{
//             x: 0,
//             opacity: 0.9,
//             scale: [0.8, 1, 1.2, 1.4, 1.2, 1],
//           }}
//           transition={{
//             type: 'spring',
//             stiffness: 90,
//             delay: index * 0.2,
//             damping: 15,
//           }}
//           exit={{ opacity: 0 }}
//           whileHover={{ cursor: 'pointer', opacity: 1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <WeekDisplay
//             totalMiles={week.totalMiles}
//             totalPay={week.totalPay}
//             totalBackHaulPay={week.backhaul}
//             weekStartDate={Date.parse(week?.weekStart).toString()}
//             weekEndDate={Date.parse(week?.weekEnd).toString()}
//           />
//         </m.div>
//       ))}

//       <Center>
//         <HStack>
//           {mapArray.length > 0 ? (
//             <Button
//               leftIcon={<TbArrowBigLeftLines />}
//               variant="outline"
//               colorScheme="cyan"
//               onClick={handlePrevClick}
//               _hover={{
//                 bg: 'cyan.600',
//                 color: 'white',
//                 scale: 1.1,
//               }}
//             />
//           ) : null}
//           {/* <Icon as={TbArrowBigLeftLines} onClick={handlePrevClick} /> */}
//           {mapArray.map((_, i) => (
//             <Button
//               key={i}
//               colorScheme="cyan"
//               variant="outline"
//               _hover={{
//                 bg: 'cyan.600',
//                 color: 'white',
//                 scale: 1.1,
//               }}
//               onClick={() => handlePageClick({ selected: i })}
//             >
//               {i + 1}
//             </Button>
//           ))}
//           {/* <Icon as={TbArrowBigRightLines} /> */}
//           {mapArray.length > 0 ? (
//             <Button
//               leftIcon={<TbArrowBigRightLines />}
//               variant="outline"
//               colorScheme="cyan"
//               onClick={handleNextClick}
//               _hover={{
//                 bg: 'cyan.600',
//                 color: 'white',
//                 scale: 1.1,
//               }}
//             />
//           ) : null}
//         </HStack>
//       </Center>
//     </>
//   )
// }
