import {
  Card,
  CardBody,
  Center,
  Container,
  Heading,
  Stack,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useGetWeekData, DayType } from '@/hooks/useGetWeekData'
import Week from './Week'
import { useState, useEffect } from 'react'
import { motion as m } from 'framer-motion'

export default function WeeklyPage(props) {
  const [widthState, setWidthState] = useState(window.innerWidth)

  const location = useLocation()
  const { state } = location
  const startDate = state?.startDate
  // const endDate = state?.endDate
  const weekStartFormat = state?.weekStartFormat
  const weekEndFormat = state?.weekEndFormat
  const { weekData, loading } = useGetWeekData({
    weekStart: Date.parse(startDate),
  })
  const colorScheme = useColorModeValue('gray', 'cyan')

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
          <Thead>
            <Tr>
              <Th>Day</Th>
              <Th isNumeric>Pay Miles</Th>
              <Th isNumeric>Actual Miles</Th>
              <Th isNumeric>Backhaul</Th>
              <Th isNumeric>Total Pay</Th>
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
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Container>
  )
}
