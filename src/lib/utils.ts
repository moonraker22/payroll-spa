import { endOfWeek, toDate, isEqual, startOfWeek } from 'date-fns'
import currency from 'currency.js'

interface WeekType {
  backhaul: number
  date: number
  endingMiles: number
  payMiles: number
  startingMiles: number
  totalMiles: 10
  uid: string
}

interface WeeklyTotalsType extends WeekType {
  weekStart: number
  weekEnd: number
}

function getWeeklyTotals(array: WeekType[]): WeeklyTotalsType[] {
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
        computePay(object.totalMiles, object.payMiles, object.backhaul)
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
        totalPay: Number(
          computePay(object.totalMiles, object.payMiles, object.backhaul)
        ),
      })
    }
  })

  sortWeeklyTotals(weeklyTotals)

  return weeklyTotals
}

function computePay(
  totalPay: number,
  payMiles: number,
  backhaul = 0
): currency {
  if (totalPay > payMiles) {
    return currency(totalPay, { precision: 2 }).multiply(0.515).add(backhaul)
  } else {
    return currency(payMiles, { precision: 2 }).multiply(0.515).add(backhaul)
  }
}

function sortWeeklyTotals(array: WeeklyTotalsType[]): void {
  array.sort((a, b) => {
    return a.weekStart - b.weekStart
  })
}

const promiseWrapper = (fn: (...args: any) => any) => {
  return (...args: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await fn(...args)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
}

export {
  getWeeklyTotals,
  endOfWeek,
  startOfWeek,
  toDate,
  isEqual,
  promiseWrapper,
}
