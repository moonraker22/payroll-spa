import { Td, Tr } from '@chakra-ui/react'
import currency from 'currency.js'
import { DocumentData } from 'firebase/firestore'

const Totals = ({ weekData }: DocumentData) => {
  const payMiles = weekData?.reduce((acc, item) => acc + item?.payMiles, 0)
  const totalMiles = weekData?.reduce((acc, item) => acc + item?.totalMiles, 0)
  const backhaul = weekData?.reduce((acc, item) => {
    return currency(item?.backhaul).add(acc)
  }, 0)

  const totalPay = weekData?.reduce((acc, item) => {
    const miles = (item) => {
      if (item?.payMiles > item?.totalMiles) {
        return item?.payMiles
      } else {
        return item?.totalMiles
      }
    }
    return currency(miles(item), { precision: 2 })
      .multiply(0.515)
      .add(item?.backhaul)
      .add(acc)
  }, 0)

  return (
    <Tr>
      <Td fontWeight="bold" color={'cyan.400'}>
        Totals
      </Td>
      <Td isNumeric fontWeight="bold" color={'cyan.400'}>
        {payMiles}
      </Td>
      <Td isNumeric fontWeight="bold" color={'cyan.400'}>
        {totalMiles}
      </Td>
      <Td isNumeric fontWeight="bold" color={'cyan.400'}>
        {backhaul && backhaul?.format()}
      </Td>
      <Td isNumeric fontWeight="bold" color={'cyan.400'}>
        {totalPay && totalPay?.format()}
      </Td>
      <Td isNumeric fontWeight="bold" color={'cyan.400'}>
        💰
      </Td>
      <Td isNumeric fontWeight="bold" color={'cyan.400'}>
        💰
      </Td>
    </Tr>
  )
}

export default Totals
