import { computeDelayPay } from '@/lib/utils'
import { Icon, Td } from '@chakra-ui/react'
import currency from 'currency.js'
import { DocumentData } from 'firebase/firestore'
import { motion as m } from 'framer-motion'
import { useMemo } from 'react'
import { GiMoneyStack, GiReceiveMoney } from 'react-icons/gi'

const Totals = ({ weekData }: { weekData: DocumentData }) => {
  const payMiles = useMemo(
    () =>
      weekData?.reduce(
        (acc: number, item: DocumentData) => acc + item?.payMiles,
        0
      ),
    [weekData]
  )

  const totalMiles = useMemo(
    () =>
      weekData?.reduce(
        (acc: number, item: DocumentData) => acc + item?.totalMiles,
        0
      ),
    [weekData]
  )

  const backhaul = useMemo(
    () =>
      weekData?.reduce((acc: number, item: DocumentData) => {
        return currency(item?.backhaul ?? 0).add(acc)
      }, 0),
    [weekData]
  )

  const totalPay: currency = useMemo(
    () =>
      weekData?.reduce((acc: number | currency, item: DocumentData) => {
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
      }, 0),
    [weekData]
  )

  const delayPay = useMemo(
    () =>
      weekData?.reduce((acc: number | currency, item: DocumentData) => {
        const delayHours = item?.delayHours ?? 0
        return currency(computeDelayPay(delayHours)).add(acc)
      }, 0),
    [weekData]
  )

  const delayHours = useMemo(
    () =>
      weekData?.reduce(
        (acc: number, item: DocumentData) => acc + (item?.delayHours ?? 0),
        0
      ),
    [weekData]
  )

  if (weekData?.length > 0) {
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
          delay: weekData.length * 0.2,
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
          {delayHours}
        </Td>
        <Td isNumeric fontWeight="bold" color={'cyan.400'}>
          {delayPay && delayPay?.format()}
        </Td>
        <Td isNumeric fontWeight="bold" color={'cyan.400'}>
          {totalPay && totalPay?.format()}
        </Td>
        <Td isNumeric fontWeight="bold" color={'cyan.400'}>
          {totalPay && delayPay && currency(totalPay).add(delayPay).format()}
        </Td>
        <Td isNumeric fontWeight="bold" color={'cyan.400'}>
          <Icon as={GiReceiveMoney} w={6} h={6} color="cyan.400'" />
        </Td>
        <Td isNumeric fontWeight="bold" color={'cyan.400'}>
          <Icon as={GiMoneyStack} w={6} h={6} color="cyan.400" />
        </Td>
      </m.tr>
    )
  } else {
    return null
  }
}

export default Totals
