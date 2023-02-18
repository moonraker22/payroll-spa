import { useGetWeekData } from '@/hooks/useGetWeekData'
import { routes } from '@/layout/routes'
import { storeActions, useStore, type WeekDataType } from '@/stores/store'
import {
  Box,
  Container,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { LayoutGroup, motion as m } from 'framer-motion'
import { Fragment, useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Totals from './Totals'
import Week from './Week'

export default function WeeklyPage(): JSX.Element {
  const location = useLocation()
  const state = location?.state as WeekDataType
  const snap = useStore()
  useEffect(() => {
    if (state?.startDate != null) {
      storeActions.setWeekData(state)
    }
  }, [state])

  const weekStartFormat =
    state?.weekStartFormat ?? snap.weekData.weekStartFormat
  const weekEndFormat = state?.weekEndFormat ?? snap.weekData.weekEndFormat

  const { weekData, loading } = useGetWeekData()
  const colorScheme = useColorModeValue('gray', 'cyan.600')

  if (weekData !== undefined) {
    return (
      <Container maxW={{ base: '100%', sm: '95%', lg: '85%' }}>
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
            as={m.table}
            layout
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
                <Th isNumeric>Delay Hrs</Th>
                <Th isNumeric>Delay Pay</Th>
                <Th isNumeric>Total Pay</Th>
                <Th isNumeric>Pay + Delay</Th>
                <Th isNumeric>Edit</Th>
                <Th isNumeric>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              <LayoutGroup>
                {/* <AnimatePresence> */}
                {!loading &&
                  weekData.map((day, i) => (
                    <Fragment key={day?.date}>
                      <Week day={day} index={i} />
                    </Fragment>
                  ))}
                <Totals weekData={weekData} />
                {/* </AnimatePresence> */}
              </LayoutGroup>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Day</Th>
                <Th isNumeric>Pay Miles</Th>
                <Th isNumeric>Actual Miles</Th>
                <Th isNumeric>Backhaul</Th>
                <Th isNumeric>Delay Hrs</Th>
                <Th isNumeric>Delay Pay</Th>
                <Th isNumeric>Total Pay</Th>
                <Th isNumeric>Pay + Delay</Th>
                <Th isNumeric>Edit</Th>
                <Th isNumeric>Delete</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Container>
    )
  } else {
    return (
      <Box>
        <Text>Whoops that page doesn&apos;t exist</Text>
      </Box>
    )
  }
}
