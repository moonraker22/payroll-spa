import { useDeletePay } from '@/hooks/useDeletePay'
import { routes } from '@/layout/routes'
import { computeDelayPay } from '@/lib/utils'
import { useStore } from '@/stores/store'
import { Icon, Td, useDisclosure, useToast } from '@chakra-ui/react'
import currency from 'currency.js'
import { isSameDay } from 'date-fns'
import { motion as m } from 'framer-motion'
import { useCallback, useMemo } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { type PaysheetType } from '../../data/paySchema'
import DeleteAlert from './DeleteAlert'

export default function Week({
  day,
  index,
}: {
  day: PaysheetType
  index: number
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const snap = useStore()
  const navigate = useNavigate()

  const [docToDelete] = useMemo(
    () =>
      snap?.paysheets.filter((item) =>
        isSameDay(new Date(item.date), new Date(day.date))
      ),
    [snap?.paysheets, day.date]
  )

  const { deletePay } = useDeletePay()
  const toast = useToast()

  const handleDelete: () => void = useCallback(() => {
    try {
      deletePay(docToDelete?.uid).catch((error) => {
        throw new Error(error)
      })
      toast({
        title: 'Pay deleted',
        description: 'Pay has been deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      onClose()
      navigate(routes.DASHBOARD)
    } catch (error) {
      toast({
        title: 'Error deleting pay',
        description: 'There was an error deleting pay',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [deletePay, docToDelete?.uid, onClose, toast])

  const handleOpen: () => void = () => {
    onOpen()
  }

  const dayFormat: string = useMemo(
    () =>
      `${new Date(day?.date).toDateString().slice(0, 3)} ${new Date(day?.date)
        .toISOString()
        .slice(6, 10)
        .split('-')
        .join('/')}`,
    [day?.date]
  )

  const miles: () => number = useCallback(() => {
    if (day?.payMiles > day?.totalMiles) {
      return day?.payMiles
    } else {
      return day?.totalMiles
    }
  }, [day?.payMiles, day?.totalMiles])

  const totalPay: string = useMemo(
    () =>
      currency(miles(), { precision: 2 })
        .multiply(0.515)
        .add(day?.backhaul)
        .format(),
    [day?.backhaul, miles]
  )

  const delayPay: currency = useMemo(
    () => currency(computeDelayPay(day.delayHours)),
    [day.delayHours]
  )
  return (
    // <AnimatePresence>
    <m.tr
      // layoutScroll
      // key={day?.date}
      // as={m.tr}
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 90,
        delay: index * 0.2,
        damping: 15,
      }}
    >
      <Td fontWeight="bold">
        <RouterLink to={routes.DAILY} state={day}>
          {dayFormat}
        </RouterLink>
      </Td>
      <Td isNumeric>{day.payMiles}</Td>
      <Td isNumeric>{day.totalMiles}</Td>
      <Td isNumeric>{currency(day.backhaul).format()}</Td>
      <Td isNumeric>{day.delayHours}</Td>
      <Td isNumeric>{delayPay.format()}</Td>
      <Td isNumeric>{totalPay}</Td>
      <Td isNumeric>{currency(totalPay).add(delayPay).format()}</Td>
      <Td isNumeric>
        <RouterLink to={routes.DAILY} state={day}>
          <Icon as={AiOutlineEdit} w={6} h={6} color="cyan.600" />
        </RouterLink>
      </Td>
      <Td isNumeric>
        <Icon
          as={RiDeleteBin3Line}
          w={6}
          h={6}
          color="red.600"
          sx={{ cursor: 'pointer' }}
          onClick={handleOpen}
        />
        <DeleteAlert
          isOpen={isOpen}
          // onOpen={onOpen}
          onClose={onClose}
          handleDelete={handleDelete}
        />
      </Td>
    </m.tr>
    // </AnimatePresence>
  )
}
