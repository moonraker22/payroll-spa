import { useDeletePay } from '@/hooks/useDeletePay'
import { routes } from '@/lib/routes'
import { store } from '@/stores/store'
import { Icon, Td, useDisclosure, useToast } from '@chakra-ui/react'
import currency from 'currency.js'
import { isSameDay } from 'date-fns'
import { DocumentData } from 'firebase/firestore'
import { motion as m } from 'framer-motion'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import DeleteAlert from './DeleteAlert'

export default function Week({
  day,
  index,
}: {
  day: DocumentData
  index: number
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const snap = useSnapshot(store)

  const [docId] = snap?.paysheets.filter((item) =>
    isSameDay(new Date(item.date), new Date(day.date))
  )

  const { deletePay } = useDeletePay()
  const toast = useToast()

  const handleDelete = () => {
    try {
      deletePay(docId?.uid)
      toast({
        title: 'Pay deleted',
        description: 'Pay has been deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      onClose()
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
  }

  const handleOpen = () => {
    onOpen()
  }

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
      <Td isNumeric>{totalPay}</Td>
      <Td isNumeric>
        <RouterLink to={routes.DAILY} state={day}>
          <Icon as={AiOutlineEdit} w={6} h={6} color="cyan.600" />
        </RouterLink>
      </Td>
      <Td isNumeric>
        {/* <IconButton
          aria-label="Delete"
          icon={<RiDeleteBin3Line />}
          color="red.600"
        /> */}
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
