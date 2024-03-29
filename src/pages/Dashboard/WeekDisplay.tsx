import {
  Badge,
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

interface WeekDisplayProps {
  totalMiles: number
  totalPay: number
  backhaul: number
  weekStart: string
  weekEnd: string
}

export function WeekDisplay({
  totalMiles,
  totalPay,
  backhaul,
  weekStart,
  weekEnd,
}: WeekDisplayProps): JSX.Element {
  const bg = useColorModeValue('gray.200', 'gray.800')

  // Date formatting
  const startDate = new Date(Number(weekStart))
  const endDate = new Date(Number(weekEnd))
  const weekStartFormat = format(startDate, 'MM/dd/yyyy')
  const weekEndFormat = format(endDate, 'MM/dd/yyyy')

  const colorScheme = useColorModeValue('gray', 'cyan.600')
  const headingColor = useColorModeValue('gray', 'cyan.400')
  const badgeColor = useColorModeValue('gray', 'cyan')
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
          my={{ base: '5px', sm: '10px', lg: '20px' }}
          mx={{ base: '10px', sm: '20px', lg: '40px' }}
          bg={bg}
          border="1px"
          borderColor={colorScheme}
          px={{ base: '0px', sm: '10px', lg: '10px' }}
          boxShadow="xl"
          rounded={20}
          variant="elevated"
        >
          <CardBody>
            <Center>
              <Heading size={['xs', 'sm', 'sm']} color={headingColor}>
                <Badge
                  variant={'outline'}
                  fontSize={['md', 'lg', 'xl']}
                  colorScheme={badgeColor}
                >
                  {weekStartFormat}
                </Badge>{' '}
                -{' '}
                <Badge
                  variant={'outline'}
                  fontSize={['md', 'lg', 'xl']}
                  colorScheme={badgeColor}
                >
                  {weekEndFormat}
                </Badge>
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
                  <Th isNumeric>{currency(backhaul).format()}</Th>
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
