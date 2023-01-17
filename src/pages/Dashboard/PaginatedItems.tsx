import { Center, HStack, Button, Box, IconButton } from '@chakra-ui/react'
import { isSameDay } from 'date-fns'
import { motion as m } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TbArrowBigLeftLines, TbArrowBigRightLines } from 'react-icons/tb'
import { useSnapshot } from 'valtio'
import { store, WeeksType } from '../../stores/store'
import { WeekDisplay } from './WeekDisplay'

export default function PaginatedItems({
  itemsPerPage,
}: {
  itemsPerPage: number
}) {
  const [itemOffset, setItemOffset] = useState(0)
  const [page, setPage] = useState(1)

  const snap = useSnapshot(store)

  const endOffset = itemOffset + itemsPerPage

  const currentItems = snap.weeks.slice(itemOffset, endOffset)

  const pageCount = Math.ceil(snap.weeks.length / itemsPerPage)

  const mapArray = Array.from(Array(pageCount).keys())

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % snap.weeks.length
    setItemOffset(newOffset)
    setPage(event.selected + 1)
  }

  const handlePrevClick = () => {
    const newOffset = (itemOffset - itemsPerPage) % snap.weeks.length
    setItemOffset(newOffset)
    setPage(page - 1)
  }

  const handleNextClick = () => {
    const newOffset = (itemOffset + itemsPerPage) % snap.weeks.length
    setItemOffset(newOffset)
    setPage(page + 1)
  }

  return (
    <>
      {currentItems.map((week, index) => (
        <m.div
          // as={m.div}
          key={week.weekStart}
          initial={{ x: -0, opacity: 0, scale: 0.8 }}
          animate={{
            x: 0,
            opacity: 0.9,
            scale: [0.8, 1, 1.2, 1.4, 1.2, 1],
          }}
          transition={{
            type: 'spring',
            stiffness: 90,
            delay: index * 0.2,
            damping: 15,
          }}
          whileHover={{ cursor: 'pointer', opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <WeekDisplay
            totalMiles={week.totalMiles}
            totalPay={week.totalPay}
            totalBackHaulPay={week.backhaul}
            weekStartDate={Date.parse(week?.weekStart).toString()}
            weekEndDate={Date.parse(week?.weekEnd).toString()}
          />
        </m.div>
      ))}
      <Box h={mapArray.length < 3 ? '30px' : '20px'} />
      <Center>
        <HStack>
          {mapArray.length > 0 ? (
            <IconButton
              icon={<TbArrowBigLeftLines />}
              variant="outline"
              colorScheme="cyan"
              onClick={handlePrevClick}
              _hover={{
                bg: 'cyan.600',
                color: 'white',
                scale: 1.1,
              }}
              disabled={page === 1}
              aria-label="Previous Page"
            />
          ) : null}
          {mapArray.map((_, i) => (
            <Button
              key={i}
              colorScheme="cyan"
              variant="outline"
              _hover={{
                bg: 'cyan.600',
                color: 'white',
                scale: 1.1,
              }}
              onClick={() => handlePageClick({ selected: i })}
            >
              {i + 1}
            </Button>
          ))}
          {mapArray.length > 0 ? (
            <IconButton
              icon={<TbArrowBigRightLines />}
              variant="outline"
              colorScheme="cyan"
              onClick={handleNextClick}
              _hover={{
                bg: 'cyan.600',
                color: 'white',
                scale: 1.1,
              }}
              disabled={page === pageCount}
              aria-label="Next Page"
            />
          ) : null}
        </HStack>
      </Center>
    </>
  )
}
