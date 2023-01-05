import { endOfWeek, toDate, isEqual, startOfWeek } from 'date-fns'
import currency from 'currency.js'

// const result = eachWeekOfInterval({
//   start: new Date(2014, 9, 6),
//   end: new Date(2014, 10, 23),
// })

// const result1 = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))

// Convert the timestamp to date:
// const result3 = toDate(1392098430000)
//=> Tue Feb 11 2014 11:30:30

// Which of these dates is the earliest?
// const result4 = min([
//   new Date(1989, 6, 10),
//   new Date(1987, 1, 11),
//   new Date(1995, 6, 2),
//   new Date(1990, 0, 1),
// ])
//=> Wed Feb 11 1987 00:00:00

// Which of these dates is the latest?
// const result5 = max([
//   new Date(1989, 6, 10),
//   new Date(1987, 1, 11),
//   new Date(1995, 6, 2),
//   new Date(1990, 0, 1),
// ])
//=> Sun Jul 02 1995 00:00:00

// Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
// const result6 = isEqual(
//   new Date(2014, 6, 2, 6, 30, 45, 0),
//   new Date(2014, 6, 2, 6, 30, 45, 500)
// )
//=> false

// // The start of a week for 2 September 2014 11:55:00:
// const result8 = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
// //=> Sun Aug 31 2014 00:00:00

// function to total miles and backhaul for each week
// function getWeeklyTotals(objects): any {
//   const weeklyTotals = []
//   objects.forEach((object) => {
//     const weekStart = startOfWeek(toDate(object.date))
//     const weekEnd = endOfWeek(toDate(object.date))

//     // console.log(weekStart, weekEnd)
//     const existingTotal = weeklyTotals.find(
//       (total) =>
//         isEqual(total.weekStart, weekStart) && isEqual(total.weekEnd, weekEnd)
//     )
//     console.log('existingTotal', existingTotal)
//     if (existingTotal) {
//       existingTotal.backhaul += object.backhaul
//       existingTotal.endingMiles += object.endingMiles
//       existingTotal.payMiles += object.payMiles
//       existingTotal.startingMiles += object.startingMiles
//       existingTotal.totalMiles += object.totalMiles
//     } else {
//       weeklyTotals.push({
//         weekStart: weekStart,
//         weekEnd: weekEnd,
//         backhaul: object.backhaul,
//         endingMiles: object.endingMiles,
//         payMiles: object.payMiles,
//         startingMiles: object.startingMiles,
//         totalMiles: object.totalMiles,
//       })
//     }
//   })
//   return weeklyTotals
// }

function getWeeklyTotals(array) {
  const weeklyTotals = []
  array.forEach((object) => {
    const weekStart = startOfWeek(toDate(object.date))
    const weekEnd = endOfWeek(toDate(object.date))

    // console.log(weekStart, weekEnd)
    const existingTotal = weeklyTotals.find(
      (total) =>
        isEqual(total.weekStart, weekStart) && isEqual(total.weekEnd, weekEnd)
    )
    // console.log('existingTotal', existingTotal)
    if (existingTotal) {
      existingTotal.backhaul += object.backhaul
      existingTotal.endingMiles += object.endingMiles
      existingTotal.payMiles += object.payMiles
      existingTotal.startingMiles += object.startingMiles
      existingTotal.totalMiles += object.totalMiles
      existingTotal.totalPay += Number(
        computePay(object.totalMiles, object.payMiles)
      )
    } else {
      weeklyTotals.push({
        weekStart: weekStart,
        weekEnd: weekEnd,
        backhaul: object.backhaul,
        endingMiles: object.endingMiles,
        payMiles: object.payMiles,
        startingMiles: object.startingMiles,
        totalMiles: object.totalMiles,
        totalPay: Number(computePay(object.totalMiles, object.payMiles)),
      })
    }
  })

  sortWeeklyTotals(weeklyTotals)

  return weeklyTotals
}

function computePay(totalPay, payMiles) {
  if (totalPay > payMiles) {
    return currency(totalPay, { precision: 2 }).multiply(0.515)
  } else {
    return currency(payMiles, { precision: 2 }).multiply(0.55)
  }
}

function sortWeeklyTotals(array) {
  array.sort((a, b) => {
    return a.weekStart - b.weekStart
  })
}

// const totalresult = getWeeklyTotals(objects)

// console.log(totalresult)

export { getWeeklyTotals, endOfWeek, startOfWeek, toDate, isEqual }

// const objects = [
//   {
//     backhaul: 1,
//     date: 1672444800000,
//     endingMiles: 1222,
//     payMiles: 24,
//     startingMiles: 122,
//     totalMiles: 1100,
//   },
//   {
//     backhaul: 1,
//     date: 1672876800000,
//     endingMiles: 1222,
//     payMiles: 24,
//     startingMiles: 122,
//     totalMiles: 1100,
//   },
//   {
//     backhaul: 1,
//     date: 1672876810000,
//     endingMiles: 1222,
//     payMiles: 24,
//     startingMiles: 122,
//     totalMiles: 1100,
//   },
//   {
//     backhaul: 1,
//     date: 1672876830000,
//     endingMiles: 1222,
//     payMiles: 24,
//     startingMiles: 122,
//     totalMiles: 1100,
//   },
//   {
//     backhaul: 1,
//     date: 1672877930000,
//     endingMiles: 1222,
//     payMiles: 24,
//     startingMiles: 122,
//     totalMiles: 1100,
//   },
//   {
//     backhaul: 1,
//     date: 1673877930000,
//     endingMiles: 1222,
//     payMiles: 24,
//     startingMiles: 122,
//     totalMiles: 1100,
//   },
// ]

// function getWeeklyTotals(array) {
//   console.log('array', array)

//   const weeklyTotals = []
//   array.forEach((object) => {
//     console.log(object)

//     const weekStart = startOfWeek(toDate(object.date))
//     const weekEnd = endOfWeek(toDate(object.date))

//     // console.log(weekStart, weekEnd)
//     const existingTotal = weeklyTotals.find(
//       (total) =>
//         isEqual(total.weekStart, weekStart) && isEqual(total.weekEnd, weekEnd)
//     )
//     // console.log('existingTotal', existingTotal)
//     if (existingTotal) {
//       existingTotal.backhaul += object.backhaul
//       existingTotal.endingMiles += object.endingMiles
//       existingTotal.payMiles += object.payMiles
//       existingTotal.startingMiles += object.startingMiles
//       existingTotal.totalMiles += object.totalMiles
//     } else {
//       weeklyTotals.push({
//         weekStart: weekStart,
//         weekEnd: weekEnd,
//         backhaul: object.backhaul,
//         endingMiles: object.endingMiles,
//         payMiles: object.payMiles,
//         startingMiles: object.startingMiles,
//         totalMiles: object.totalMiles,
//       })
//     }
//   })

//   return weeklyTotals
// }
