import { PaysheetType, WeeksType } from '@/stores/store'
import currency from 'currency.js'
import { endOfWeek, isEqual, startOfWeek, toDate } from 'date-fns'

/**
 * function to get the weekly totals from an array of paysheets
 * @param array PaysheetType[]
 * @returns array of WeeksType[]
 */

function getWeeklyTotals(array: PaysheetType[]): WeeksType[] {
  const weeklyTotals: any = []

  array.forEach((object) => {
    const weekStart = startOfWeek(toDate(object.date))
    const weekEnd = endOfWeek(toDate(object.date))

    const existingTotal = weeklyTotals.find(
      (total: any) =>
        isEqual(total.weekStart, weekStart) && isEqual(total.weekEnd, weekEnd)
    )

    if (existingTotal) {
      existingTotal.backhaul += object.backhaul
      existingTotal.endingMiles += object.endingMiles
      existingTotal.payMiles += object.payMiles
      existingTotal.startingMiles += object.startingMiles
      existingTotal.totalMiles += object.totalMiles
      existingTotal.delayHours += object.delayHours
      existingTotal.delayPay += computeDelayPay(object.delayHours)
      existingTotal.finalMiles += computeFinalMiles({
        totalMiles: object.totalMiles,
        payMiles: object.payMiles,
      })
      existingTotal.totalPay += Number(
        computePay({
          totalMiles: object.totalMiles,
          payMiles: object.payMiles,
          backhaul: object.backhaul,
        })
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
        delayHours: object.delayHours,
        delayPay: computeDelayPay(object.delayHours),
        finalMiles: computeFinalMiles({
          totalMiles: object.totalMiles,
          payMiles: object.payMiles,
        }),
        totalPay: Number(
          computePay({
            totalMiles: object.totalMiles,
            payMiles: object.payMiles,
            backhaul: object.backhaul,
          })
        ),
      })
    }
  })

  return weeklyTotals
}

export function computePay({
  totalMiles,
  payMiles,
  backhaul = 0,
}: {
  totalMiles: number
  payMiles: number
  backhaul?: number
}): currency {
  if (totalMiles > payMiles) {
    return currency(totalMiles, { precision: 2 }).multiply(0.515).add(backhaul)
  } else {
    return currency(payMiles, { precision: 2 }).multiply(0.515).add(backhaul)
  }
}

/**
 * Returns the total miles or pay miles, whichever is greater.
 * @param totalMiles The total miles
 * @param payMiles The pay miles
 * @returns The total miles or pay miles, whichever is greater.
 */
export function computeFinalMiles({
  totalMiles,
  payMiles,
}: {
  totalMiles: number
  payMiles: number
}): number {
  if (totalMiles > payMiles) {
    return totalMiles
  } else {
    return payMiles
  }
}

// function sortWeeklyTotals(array: WeeklyTotalsType[]): void {
//   array.sort((a, b) => {
//     return a.weekStart - b.weekStart
//   })
// }

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

export const computeDelayPay = (delay: number): number => {
  if (delay <= 0) {
    return 0
  }
  const total = currency(delay, { precision: 2 }).multiply(13.25)
  return total.value
}
