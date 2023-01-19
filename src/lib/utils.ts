import { PaysheetType, WeeksType } from '@/stores/store'
import currency from 'currency.js'
import { endOfWeek, isEqual, startOfWeek, toDate } from 'date-fns'

// export interface WeekType {
//   backhaul: number
//   date: number
//   endingMiles: number
//   payMiles: number
//   startingMiles: number
//   totalMiles: number
//   uid: string
// }

// export interface WeeklyTotalsType extends WeekType {
//   weekStart: number
//   weekEnd: number
//   totalPay: number
// }

function getWeeklyTotals(array: PaysheetType[]): WeeksType[] {
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

  // sortWeeklyTotals(weeklyTotals)

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
