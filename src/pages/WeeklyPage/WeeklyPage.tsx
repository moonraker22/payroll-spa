import { useGetWeekData } from '@/hooks/useGetWeekData'
import { routes } from '@/lib/routes'
import { useSnapshot } from '@/stores/store'
import {
  Container,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion as m } from 'framer-motion'
import { Fragment, useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { store } from '../../stores/store'
import Totals from './Totals'
import Week from './Week'

export default function WeeklyPage() {
  const location = useLocation()
  // const navigate = useNavigate()
  const state = location?.state
  const snap = useSnapshot(store)
  useEffect(() => {
    if (state?.startDate) {
      store.weekData = state
    }
  }, [state])

  // useEffect(() => {
  //   if (state === undefined) {
  //     navigate(routes.DASHBOARD)
  //   }
  // }, [location.state, navigate])

  // const startDate = state?.startDate || snap.weekData.startDate
  const weekStartFormat =
    state?.weekStartFormat || snap.weekData.weekStartFormat
  const weekEndFormat = state?.weekEndFormat || snap.weekData.weekEndFormat
  const { weekData, loading } = useGetWeekData()
  const colorScheme = useColorModeValue('gray', 'cyan.600')

  return (
    <Container maxW={{ base: '100%', sm: '95%', lg: '75%' }}>
      <TableContainer
        my="40"
        border="1px"
        borderColor={colorScheme}
        rounded={20}
        py="5"
        as={m.div}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <Table
          variant="simple"
          colorScheme={colorScheme}
          size={{ base: 'sm', sm: 'md', lg: 'md' }}
        >
          <TableCaption placement="top">PAY FOR THE WEEK</TableCaption>
          <TableCaption placement="bottom">
            Week from {weekStartFormat} - {weekEndFormat}
          </TableCaption>
          <TableCaption placement="bottom">
            Go back to{' '}
            <Link as={RouterLink} to={routes.DASHBOARD} color={colorScheme}>
              Dashboard
            </Link>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Day</Th>
              <Th isNumeric>Pay Miles</Th>
              <Th isNumeric>Actual Miles</Th>
              <Th isNumeric>Backhaul</Th>
              <Th isNumeric>Total Pay</Th>
              <Th isNumeric>Edit</Th>
              <Th isNumeric>Delete</Th>
            </Tr>
          </Thead>

          <Tbody>
            {!loading &&
              weekData?.map((day, i) => (
                <Fragment key={i}>
                  <Week day={day} />
                </Fragment>
              ))}
            <Totals weekData={weekData} />
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Day</Th>
              <Th isNumeric>Pay Miles</Th>
              <Th isNumeric>Actual Miles</Th>
              <Th isNumeric>Backhaul</Th>
              <Th isNumeric>Total Pay</Th>
              <Th isNumeric>Edit</Th>
              <Th isNumeric>Delete</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Container>
  )
}
