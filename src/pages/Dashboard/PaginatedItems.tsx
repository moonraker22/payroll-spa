import { usePaginateData } from '@/hooks/usePaginate'
import { Box, Button, ButtonGroup, Center, IconButton } from '@chakra-ui/react'
import { motion as m } from 'framer-motion'
import { useCallback } from 'react'
import {
  TbArrowBigLeft,
  TbArrowBigLeftLines,
  TbArrowBigRight,
  TbArrowBigRightLines,
} from 'react-icons/tb'
import { WeekDisplay } from './WeekDisplay'

export default function PaginatedItems({
  itemsPerPage,
}: {
  itemsPerPage: number
}) {
  const {
    currentPage,
    pageData,
    getPreviousPage,
    getNextPage,
    mapArray,
    handlePageClick,
    pageCount,
    getFirstPage,
    getLastPage,
  } = usePaginateData({
    pageSize: itemsPerPage,
  })

  const shouldDisplay = useCallback(
    (i: number) => {
      if (i === 1 || i === pageCount) {
        return true
      }
      if (i >= currentPage - 2 && i <= currentPage + 2) {
        return true
      }
      if (i < currentPage - 2 || i > currentPage + 2) {
        return false
      }
      return false
    },
    [currentPage, pageCount]
  )

  return (
    <>
      {pageData.map((week, index) => (
        <m.div
          // as={m.div}
          key={week.weekStart}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.9,
            scale: [0.8, 1, 1.2, 1.4, 1.2, 1],
          }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 90,
            delay: index * 0.2,
            damping: 15,
          }}
          whileHover={{
            cursor: 'pointer',
            opacity: 1,
          }}
        >
          <WeekDisplay
            totalMiles={week.finalMiles}
            totalPay={week.totalPay + week.delayPay}
            backhaul={week.backhaul}
            weekStart={Date.parse(week?.weekStart).toString()}
            weekEnd={Date.parse(week?.weekEnd).toString()}
          />
        </m.div>
      ))}
      <Box
        h={mapArray.length < 3 ? '30px' : '20px'}
        sx={{ overflow: 'hidden' }}
      />

      <Center>
        <ButtonGroup isAttached>
          {mapArray.length > 0 && currentPage > 1 ? (
            <>
              <IconButton
                icon={<TbArrowBigLeftLines />}
                variant="outline"
                colorScheme="cyan"
                onClick={getFirstPage}
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
                boxShadow="lg"
                disabled={currentPage === 1}
                aria-label="First Page"
              />
              <IconButton
                icon={<TbArrowBigLeft />}
                variant="outline"
                colorScheme="cyan"
                onClick={getPreviousPage}
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
                boxShadow="lg"
                disabled={currentPage === 1}
                aria-label="Previous Page"
              />
            </>
          ) : null}
          {mapArray.map((_, i) => {
            return (
              <Button
                key={_}
                colorScheme="cyan"
                variant={currentPage === i + 1 ? 'ghost' : 'outline'}
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
                boxShadow="lg"
                onClick={() => handlePageClick({ selected: i })}
                display={shouldDisplay(i + 1) ? 'block' : 'none'}
              >
                {i + 1}
              </Button>
            )
          })}
          {mapArray.length > 0 && currentPage < pageCount ? (
            <>
              <IconButton
                icon={<TbArrowBigRight />}
                variant="outline"
                colorScheme="cyan"
                onClick={getNextPage}
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
                boxShadow="lg"
                disabled={currentPage === pageCount}
                aria-label="Next Page"
              />
              <IconButton
                icon={<TbArrowBigRightLines />}
                variant="outline"
                colorScheme="cyan"
                onClick={getLastPage}
                _hover={{
                  bg: 'cyan.600',
                  color: 'white',
                  scale: 1.1,
                }}
                boxShadow="lg"
                disabled={currentPage === pageCount}
                aria-label="First Page"
              />
            </>
          ) : null}
        </ButtonGroup>
      </Center>
    </>
  )
}
