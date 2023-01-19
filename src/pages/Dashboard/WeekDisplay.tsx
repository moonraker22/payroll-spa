import {
  Card,
  CardBody,
  Center,
  Heading,
  LinkBox,
  LinkOverlay,
  Table,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import currency from 'currency.js'
import { format } from 'date-fns'
import { Link as RouterLink } from 'react-router-dom'

export function WeekDisplay({
  totalMiles,
  totalPay,
  totalBackHaulPay,
  weekStartDate,
  weekEndDate,
}) {
  const bg = useColorModeValue('gray.200', 'gray.800')

  //Date formatting
  const startDate = new Date(Number(weekStartDate))
  const endDate = new Date(Number(weekEndDate))
  const weekStartFormat = format(startDate, 'MM/dd/yyyy')
  const weekEndFormat = format(endDate, 'MM/dd/yyyy')

  const colorScheme = useColorModeValue('gray', 'cyan.600')
  const tableColorScheme = useColorModeValue('blackAlpha', 'cyan')
  return (
    <LinkBox>
      <LinkOverlay
        as={RouterLink}
        to="/weekly"
        state={{ weekStartFormat, weekEndFormat, startDate, endDate }}
        sx={{ textDecoration: 'none' }}
      >
        <Card
          m="10px"
          bg={bg}
          border="1px"
          borderColor={colorScheme}
          px="10px"
          boxShadow="xl"
          rounded={20}
          // textColor={colorScheme}
        >
          <CardBody>
            <Center>
              <Heading size="xs">
                Dates: {weekStartFormat} - {weekEndFormat}
              </Heading>
            </Center>
            <Table
              variant="simple"
              colorScheme={tableColorScheme}
              size={{ base: 'sm', sm: 'md', lg: 'lg' }}
            >
              <Thead>
                <Tr>
                  <Th isNumeric>Total </Th>
                  <Th isNumeric>Total </Th>
                  <Th isNumeric>Total </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th isNumeric>{totalMiles}</Th>
                  <Th isNumeric>{currency(totalPay).format()}</Th>
                  <Th isNumeric>{currency(totalBackHaulPay).format()}</Th>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th isNumeric> Miles</Th>
                  <Th isNumeric> Pay</Th>
                  <Th isNumeric> Backhaul</Th>
                </Tr>
              </Tfoot>
            </Table>
          </CardBody>
        </Card>
      </LinkOverlay>
    </LinkBox>
  )
}
