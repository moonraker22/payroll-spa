import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { store, WeeksType } from '../stores/store'

export const usePaginateData = ({ pageSize }: { pageSize: number }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageData, setPageData] = useState<WeeksType[]>([])

  const snap = useSnapshot(store)

  const pageCount = Math.ceil(snap.weeks.length / pageSize)

  const maxPage = Math.ceil(snap.weeks.length / pageSize)
  const mapArray: number[] = Array.from(Array(pageCount).keys())

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setCurrentPage(selectedPage + 1)
  }

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize
    const newPageData = snap.weeks.slice(startIndex, startIndex + pageSize)
    setPageData(newPageData)
  }, [snap.weeks, currentPage, pageSize])

  const getPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  const getNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, maxPage))
  }

  return {
    currentPage,
    pageData,
    getPreviousPage,
    getNextPage,
    mapArray,
    handlePageClick,
    pageCount,
  }
}

// export const usePagination = ({
//   totalCount,
//   pageSize,
//   siblingCount = 1,
//   currentPage,
//   arrayOfData,
// }) => {
//   const paginationRange = useMemo(() => {
//     const totalPageCount = Math.ceil(totalCount / pageSize)

//     const totalPageNumbers = siblingCount + 5

//     if (totalPageNumbers >= totalPageCount) {
//       return [...Array(totalPageCount)].map((_, index) => index + 1)
//     }

//     const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
//     const rightSiblingIndex = Math.min(
//       currentPage + siblingCount,
//       totalPageCount
//     )

//     const shouldShowLeftDots = leftSiblingIndex > 2
//     const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

//     const firstPageIndex = 1
//     const lastPageIndex = totalPageCount

//     if (!shouldShowLeftDots && shouldShowRightDots) {
//       let leftItemCount = 3 + 2 * siblingCount
//       let leftRange = [...Array(leftItemCount)].map((_, index) => index + 1)

//       return [...leftRange, '...', lastPageIndex]
//     }
//   }, [totalCount, pageSize, siblingCount, currentPage, arrayOfData])

//   return paginationRange
// }

// export const usePaginate = ({ data, pageSize }) => {
//   const [currentPage, setCurrentPage] = React.useState(1)
//   const [pageData, setPageData] = React.useState([])

//   const maxPage = Math.ceil(data.length / pageSize)

//   React.useEffect(() => {
//     const startIndex = (currentPage - 1) * pageSize
//     const newPageData = data.slice(startIndex, startIndex + pageSize)
//     setPageData(newPageData)
//   }, [data, currentPage, pageSize])

//   const getPreviousPage = () => {
//     setCurrentPage((page) => Math.max(page - 1, 1))
//   }

//   const getNextPage = () => {
//     setCurrentPage((page) => Math.min(page + 1, maxPage))
//   }

//   return { currentPage, pageData, getPreviousPage, getNextPage }
// }

// export function usePaginateRange({ currentPage, siblingCount = 1, pageCount }) {
//   const paginationRange = useMemo(() => {
//     const totalPageNumbers = siblingCount + 5

//     if (totalPageNumbers >= pageCount) {
//       return [...Array(pageCount)].map((_, index) => index + 1)
//     }

//     const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
//     const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount)

//     const shouldShowLeftDots = leftSiblingIndex > 2
//     const shouldShowRightDots = rightSiblingIndex < pageCount - 2

//     const firstPageIndex = 1
//     const lastPageIndex = pageCount

//     if (!shouldShowLeftDots && shouldShowRightDots) {
//       let leftItemCount = 3 + 2 * siblingCount
//       let leftRange = [...Array(leftItemCount)].map((_, index) => index + 1)

//       return [...leftRange, '...', lastPageIndex]
//     }

//     if (shouldShowLeftDots && !shouldShowRightDots) {
//       let rightItemCount = 3 + 2 * siblingCount
//       let rightRange = [...Array(rightItemCount)].map(
//         (_, index) => index + pageCount - rightItemCount + 1
//       )

//       return [firstPageIndex, '...', ...rightRange]
//     }

//     if (shouldShowLeftDots && shouldShowRightDots) {
//       let middleRange = [...Array(2 * siblingCount + 3)].map(
//         (_, index) => index + leftSiblingIndex
//       )

//       return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
//     }
//   }, [currentPage, siblingCount, pageCount])

//   return paginationRange
// }

// // function to paginate data and return data and array with ellipsis
// export function useEllipsisPagination({
//   currentPage,
//   siblingCount = 1,
//   totalCount,
//   pageSize,
//   arrayOfData,
// }) {
//   const paginationRange = useMemo(() => {
//     const totalPageNumbers = siblingCount + 5

//     if (totalPageNumbers >= totalCount) {
//       return [...Array(totalCount)].map((_, index) => index + 1)
//     }

//     const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
//     const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount)

//     const shouldShowLeftDots = leftSiblingIndex > 2
//     const shouldShowRightDots = rightSiblingIndex < totalCount - 2

//     const firstPageIndex = 1
//     const lastPageIndex = totalCount

//     if (!shouldShowLeftDots && shouldShowRightDots) {
//       let leftItemCount = 3 + 2 * siblingCount
//       let leftRange = [...Array(leftItemCount)].map((_, index) => index + 1)

//       return [...leftRange, '...', lastPageIndex]
//     }

//     if (shouldShowLeftDots && !shouldShowRightDots) {
//       let rightItemCount = 3 + 2 * siblingCount
//       let rightRange = [...Array(rightItemCount)].map(
//         (_, index) => index + totalCount - rightItemCount + 1
//       )

//       return [firstPageIndex, '...', ...rightRange]
//     }

//     if (shouldShowLeftDots && shouldShowRightDots) {
//       let middleRange = [...Array(2 * siblingCount + 3)].map(
//         (_, index) => index + leftSiblingIndex
//       )

//       return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
//     }
//   }, [totalCount, pageSize, siblingCount, currentPage, arrayOfData])

//   return paginationRange
// }

// import { Center, HStack, Button, Box, IconButton } from '@chakra-ui/react'
// import { isSameDay } from 'date-fns'
// import { motion as m } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import { TbArrowBigLeftLines, TbArrowBigRightLines } from 'react-icons/tb'
// import { useSnapshot } from 'valtio'
// import { store, WeeksType } from '../../stores/store'
// import { WeekDisplay } from './WeekDisplay'
// import { usePaginateData } from '../../hooks/usePaginate'

// export default function PaginatedItems({
//   itemsPerPage,
// }: {
//   itemsPerPage: number
// }) {
//   const [itemOffset, setItemOffset] = useState(0)
//   const [page, setPage] = useState(1)

//   const snap = useSnapshot(store)

//   const endOffset = itemOffset + itemsPerPage

//   const currentItems = snap.weeks.slice(itemOffset, endOffset)

//   const pageCount = Math.ceil(snap.weeks.length / itemsPerPage)

//   const mapArray = Array.from(Array(pageCount).keys())

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % snap.weeks.length
//     setItemOffset(newOffset)
//     setPage(event.selected + 1)
//   }

//   const handlePrevClick = () => {
//     const newOffset = (itemOffset - itemsPerPage) % snap.weeks.length
//     setItemOffset(newOffset)
//     setPage(page - 1)
//   }

//   const handleNextClick = () => {
//     const newOffset = (itemOffset + itemsPerPage) % snap.weeks.length
//     setItemOffset(newOffset)
//     setPage(page + 1)
//   }

//   const pageSize = 4

//   const {
//     currentPage,
//     pageData,
//     getPreviousPage,
//     getNextPage,
//     mapArray: mapArray2,
//     handlePageClick: handlePageClick2,
//     itemOffset: itemOffset2,
//   } = usePaginateData({
//     pageSize,
//   })

//   console.log(currentPage, 'currentPage')
//   console.log(pageData, 'pageData')
//   console.log(getPreviousPage, 'getPreviousPage')
//   console.log(getNextPage, 'getNextPage')
//   console.log(mapArray2, 'mapArray2')
//   console.log(handlePageClick2, 'handlePageClick2')
//   console.log(itemOffset2, 'itemOffset2')

//   return (
//     <>
//       {currentItems.map((week, index) => (
//         <m.div
//           // as={m.div}
//           key={week.weekStart}
//           initial={{ x: -0, opacity: 0, scale: 0.8 }}
//           animate={{
//             x: 0,
//             opacity: 0.9,
//             scale: [0.8, 1, 1.2, 1.4, 1.2, 1],
//           }}
//           transition={{
//             type: 'spring',
//             stiffness: 90,
//             delay: index * 0.2,
//             damping: 15,
//           }}
//           whileHover={{ cursor: 'pointer', opacity: 1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <WeekDisplay
//             totalMiles={week.totalMiles}
//             totalPay={week.totalPay}
//             totalBackHaulPay={week.backhaul}
//             weekStartDate={Date.parse(week?.weekStart).toString()}
//             weekEndDate={Date.parse(week?.weekEnd).toString()}
//           />
//         </m.div>
//       ))}
//       <Box h={mapArray.length < 3 ? '30px' : '20px'} />
//       <Center>
//         <HStack>
//           {mapArray.length > 0 ? (
//             <IconButton
//               icon={<TbArrowBigLeftLines />}
//               variant="outline"
//               colorScheme="cyan"
//               onClick={handlePrevClick}
//               _hover={{
//                 bg: 'cyan.600',
//                 color: 'white',
//                 scale: 1.1,
//               }}
//               disabled={page === 1}
//               aria-label="Previous Page"
//             />
//           ) : null}
//           {mapArray.map((_, i) => (
//             <Button
//               key={i}
//               colorScheme="cyan"
//               variant="outline"
//               _hover={{
//                 bg: 'cyan.600',
//                 color: 'white',
//                 scale: 1.1,
//               }}
//               onClick={() => handlePageClick({ selected: i })}
//             >
//               {i + 1}
//             </Button>
//           ))}
//           {mapArray.length > 0 ? (
//             <IconButton
//               icon={<TbArrowBigRightLines />}
//               variant="outline"
//               colorScheme="cyan"
//               onClick={handleNextClick}
//               _hover={{
//                 bg: 'cyan.600',
//                 color: 'white',
//                 scale: 1.1,
//               }}
//               disabled={page === pageCount}
//               aria-label="Next Page"
//             />
//           ) : null}
//         </HStack>
//       </Center>
//     </>
//   )
// }
