import { Icon, Td } from '@chakra-ui/react'
import currency from 'currency.js'
import { DocumentData } from 'firebase/firestore'
import { motion as m } from 'framer-motion'
import { GiMoneyStack, GiReceiveMoney } from 'react-icons/gi'

const Totals = ({ weekData }: { weekData: DocumentData }) => {
  const payMiles = weekData?.reduce(
    (acc: number, item: DocumentData) => acc + item?.payMiles,
    0
  )
  const totalMiles = weekData?.reduce(
    (acc: number, item: DocumentData) => acc + item?.totalMiles,
    0
  )
  const backhaul = weekData?.reduce((acc: number, item: DocumentData) => {
    return currency(item?.backhaul).add(acc)
  }, 0)

  const totalPay: currency = weekData?.reduce(
    (acc: number | currency, item: DocumentData) => {
      const miles = (item: DocumentData) => {
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
    },
    0
  )

  return (
    <m.tr
      // as={m.tr}
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 90,
        delay: 4 * 0.2,
        damping: 15,
      }}
    >
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
        <Icon as={GiReceiveMoney} w={6} h={6} color="cyan.400'" />
      </Td>
      <Td isNumeric fontWeight="bold" color={'cyan.400'}>
        <Icon as={GiMoneyStack} w={6} h={6} color="cyan.400" />
      </Td>
    </m.tr>
  )
}

export default Totals
