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
} from '@chakra-ui/react'

export function WeekDisplay({
  totalMiles,
  totalPay,
  totalBackHaulPay,
  weekStartDate,
  weekEndDate,
}) {
  const bg = useColorModeValue('gray.400', 'gray.600')
  return (
    <Card m="10px" bg={bg}>
      <CardHeader>
        <Heading size="md">
          Week {weekStartDate} - {weekEndDate}
        </Heading>
      </CardHeader>

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
                {totalPay}
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
  )
}
