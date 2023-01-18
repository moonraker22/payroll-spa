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
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetWeekData } from '@/hooks/useGetWeekData'
import { Link as RouterLink } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import { routes } from '@/lib/routes'
import { useEffect } from 'react'
import Week from './Week'

export default function WeeklyPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location?.state

  useEffect(() => {
    if (state === undefined) {
      navigate(routes.DASHBOARD)
    }
  }, [location.state, navigate])

  const startDate = state?.startDate || ''
  const weekStartFormat = state?.weekStartFormat
  const weekEndFormat = state?.weekEndFormat
  const { weekData, loading } = useGetWeekData({
    weekStart: Date.parse(startDate),
  })
  const colorScheme = useColorModeValue('gray', 'cyan.600')

  return (
    <Container maxW={{ base: '100%', sm: '95%', lg: '90%' }}>
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
          size={{ base: 'sm', sm: 'md', lg: 'lg' }}
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
            </Tr>
          </Thead>

          {!loading &&
            weekData?.map((day, i) => (
              <Tbody key={i}>
                <Week day={day} />
              </Tbody>
            ))}
          <Tfoot>
            <Tr>
              <Th>Day</Th>
              <Th isNumeric>Pay Miles</Th>
              <Th isNumeric>Actual Miles</Th>
              <Th isNumeric>Backhaul</Th>
              <Th isNumeric>Total Pay</Th>
              <Th isNumeric>Edit</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Container>
  )
}
