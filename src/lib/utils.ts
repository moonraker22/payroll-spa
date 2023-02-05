import { PaysheetType, WeeksType } from '@/stores/store'
import currency from 'currency.js'
import { endOfWeek, isEqual, parseISO, startOfWeek, toDate } from 'date-fns'

/**
 * function to get the weekly totals from an array of paysheets
 * @param array PaysheetType[]
 * @returns array of WeeksType[]
 */

function getWeeklyTotals(array: PaysheetType[]): WeeksType[] {
  const weeklyTotals: WeeksType[] = []

  if (array.length === 0) {
    return []
  }
  array.forEach((object) => {
    const weekStart = startOfWeek(toDate(object.date))
    const weekEnd = endOfWeek(toDate(object.date))

    const existingTotal = weeklyTotals.find(
      (total: any) =>
        isEqual(parseISO(total.weekStart), weekStart) &&
        isEqual(parseISO(total.weekEnd), weekEnd)
    )

    if (existingTotal) {
      existingTotal.backhaul += object?.backhaul
      existingTotal.endingMiles += object?.endingMiles
      existingTotal.payMiles += object?.payMiles
      existingTotal.startingMiles += object?.startingMiles
      existingTotal.totalMiles += object?.totalMiles
      existingTotal.delayHours += object?.delayHours
      existingTotal.delayPay += computeDelayPay(object?.delayHours || 0)
      existingTotal.finalMiles += computeFinalMiles({
        totalMiles: object?.totalMiles,
        payMiles: object?.payMiles,
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
        weekStart: weekStart.toISOString(),
        weekEnd: weekEnd.toISOString(),
        backhaul: object?.backhaul || 0,
        endingMiles: object?.endingMiles || 0,
        payMiles: object?.payMiles || 0,
        startingMiles: object?.startingMiles || 0,
        totalMiles: object?.totalMiles || 0,
        delayHours: object?.delayHours || 0,
        delayPay: computeDelayPay(object?.delayHours || 0),
        finalMiles: computeFinalMiles({
          totalMiles: object?.totalMiles || 0,
          payMiles: object?.payMiles || 0,
        }),
        totalPay: Number(
          computePay({
            totalMiles: object?.totalMiles,
            payMiles: object?.payMiles,
            backhaul: object?.backhaul,
          })
        ),
      })
    }
  })

  return weeklyTotals
}

type ComputePayProps = {
  totalMiles: number
  payMiles: number
  backhaul?: number
}

export function computePay({
  totalMiles,
  payMiles,
  backhaul = 0,
}: ComputePayProps): currency {
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

type ComputeFinalMilesProps = {
  totalMiles: number
  payMiles: number
}

export function computeFinalMiles({
  totalMiles,
  payMiles,
}: ComputeFinalMilesProps): number {
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
        if (response) {
          resolve(response)
        } else {
          reject(new Error('No response'))
        }
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

/**
 * Compute the delay pay for a given delay in days
 * @param delay - Number of days of delay
 * @returns - The delay pay for the given delay
 */
export const computeDelayPay = (delay: number): number => {
  if (delay <= 0) {
    return 0
  }
  const total = currency(delay, { precision: 2 }).multiply(13.25)
  return total.value
}
