import { endOfWeek, toDate, isEqual, startOfWeek } from 'date-fns'
import currency from 'currency.js'

function getWeeklyTotals(array) {
  const weeklyTotals = []
  array.forEach((object) => {
    const weekStart = startOfWeek(toDate(object.date))
    const weekEnd = endOfWeek(toDate(object.date))

    const existingTotal = weeklyTotals.find(
      (total) =>
        isEqual(total.weekStart, weekStart) && isEqual(total.weekEnd, weekEnd)
    )
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
    return currency(payMiles, { precision: 2 }).multiply(0.515)
  }
}

function sortWeeklyTotals(array) {
  array.sort((a, b) => {
    return a.weekStart - b.weekStart
  })
}

export { getWeeklyTotals, endOfWeek, startOfWeek, toDate, isEqual }
