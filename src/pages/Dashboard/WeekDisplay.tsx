import { Link } from 'react-router-dom'
import {
  Box,
  Center,
  Stack,
  useColorModeValue,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Button,
  Skeleton,
  useDisclosure,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import currency from 'currency.js'
import { format } from 'date-fns'
import { DayModal } from '@/components/DayModal'

export function WeekDisplay({
  totalMiles,
  totalPay,
  totalBackHaulPay,
  weekStartDate,
  weekEndDate,
  // isLoading,
}) {
  const bg = useColorModeValue('gray.400', 'gray.800')

  //Date formatting
  const startDate = new Date(Number(weekStartDate))
  const endDate = new Date(Number(weekEndDate))
  const weekStartFormat = format(startDate, 'MM/dd/yyyy')
  const weekEndFormat = format(endDate, 'MM/dd/yyyy')

  const colorScheme = useColorModeValue('gray', 'cyan.700')

  return (
    <LinkBox>
      <Card m="10px" bg={bg} border="1px" borderColor={colorScheme} px="10px">
        <LinkOverlay
          as={Link}
          to="/weekly"
          state={{ weekStartFormat, weekEndFormat, startDate, endDate }}
        />
        <Heading size="md" mt={5} mx={'auto'}>
          Week {weekStartFormat} - {weekEndFormat}
        </Heading>
        {/* <DayModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        weekStartFormat={weekStartFormat}
        weekEndFormat={weekEndFormat}
        startDate={startDate}
        endDate={endDate}
      /> */}

        <CardBody>
          <Stack
            divider={<StackDivider borderColor="gray.200" mx="10px" />}
            spacing="auto"
            direction="row"
          >
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Total Miles
              </Heading>
              <Center>
                <Text pt="2" fontSize="sm">
                  {totalMiles}
                </Text>
              </Center>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Total Pay
              </Heading>
              <Center>
                <Text pt="2" fontSize="sm">
                  {currency(totalPay).format()}
                </Text>
              </Center>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Total Backhaul
              </Heading>
              <Center>
                <Text pt="2" fontSize="sm">
                  {totalBackHaulPay}
                </Text>
              </Center>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </LinkBox>
  )
}
