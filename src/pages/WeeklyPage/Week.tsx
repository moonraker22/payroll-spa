import { Icon, Td, Tr } from '@chakra-ui/react'
import currency from 'currency.js'
import { AiOutlineEdit } from 'react-icons/ai'
import { Link as RouterLink } from 'react-router-dom'
import { routes } from '../../lib/routes'

export default function Week({ day }) {
  // const result = getDay(day?.date)

  // const daysOfWeek = new Map([
  //   [0, 'Sun'],
  //   [1, 'Mon'],
  //   [2, 'Tues'],
  //   [3, 'Wed'],
  //   [4, 'Thurs'],
  //   [5, 'Fri'],
  //   [6, 'Sat'],
  // ])

  const dayFormat = `${new Date(day?.date)
    .toDateString()
    .slice(0, 3)} ${new Date(day?.date)
    .toISOString()
    .slice(6, 10)
    .split('-')
    .join('/')}`

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
      <Td>
        <RouterLink to={routes.DAILY} state={day}>
          {dayFormat}
        </RouterLink>
      </Td>
      <Td isNumeric>{day.payMiles}</Td>
      <Td isNumeric>{day.totalMiles}</Td>
      <Td isNumeric>{currency(day.backhaul).format()}</Td>
      <Td isNumeric>{totalPay}</Td>
      <Td isNumeric>
        <RouterLink to={routes.DAILY} state={day}>
          <Icon as={AiOutlineEdit} w={6} h={6} color="cyan.600" />
        </RouterLink>
      </Td>
    </Tr>
  )
}
