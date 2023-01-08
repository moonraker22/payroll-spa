import {
  Box,
  Button,
  HStack,
  StackDivider,
  Text,
  VStack,
  Link,
  Tr,
  Td,
} from '@chakra-ui/react'
import currency from 'currency.js'
import { getDay } from 'date-fns'
import { Link as RouterLink } from 'react-router-dom'

export default function Week({ day }) {
  const result = getDay(day?.date)
  const daysOfWeek = new Map([
    [0, 'Sun'],
    [1, 'Mon'],
    [2, 'Tues'],
    [3, 'Wed'],
    [4, 'Thurs'],
    [5, 'Fri'],
    [6, 'Sat'],
  ])

  const dayFormat = daysOfWeek.get(result)

  const miles = () => {
    if (day?.payMiles > day?.totalMiles) {
      return day?.payMiles
    } else {
      return day?.totalMiles
    }
  }

  const totalPay = currency(miles(), { precision: 2 })
    .multiply(0.515)
    .add(day?.backhaul)
    .format()
  return (
    <Tr>
      <Td>{dayFormat}</Td>
      <Td isNumeric>{day.payMiles}</Td>
      <Td isNumeric>{day.totalMiles}</Td>
      <Td isNumeric>{currency(day.backhaul).format()}</Td>
      <Td isNumeric>{totalPay}</Td>
    </Tr>
  )
}
