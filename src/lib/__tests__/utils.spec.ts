import { PaysheetType } from '@/stores/store'
import currency from 'currency.js'
import { describe, expect, it } from 'vitest'
import { computeFinalMiles, computePay, getWeeklyTotals } from '../utils'

beforeEach(() => {})

describe('getWeeklyTotals', () => {
  const weekData: PaysheetType[] = [
    {
      backhaul: 12.5,
      date: 1619715200000,
      endingMiles: 200,
      payMiles: 12,
      startingMiles: 100,
      totalMiles: 11,
      uid: '123',
    },
    {
      backhaul: 0,
      date: 1619715200000,
      endingMiles: 0,
      payMiles: 10,
      startingMiles: 0,
      totalMiles: 10,
      uid: '123',
    },
  ]
  it('should return an array', () => {
    const result = getWeeklyTotals(weekData)
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('weekStart')
    expect(result[0]).toHaveProperty('weekEnd')
    expect(result[0]).toHaveProperty('backhaul')
    expect(result[0]).toHaveProperty('endingMiles')
    expect(result[0]).toHaveProperty('payMiles')
    expect(result[0]).toHaveProperty('startingMiles')
    expect(result[0]).toHaveProperty('totalMiles')
    expect(result[0]).toHaveProperty('totalPay')
    expect(result[0]).toHaveProperty('finalMiles')
  })

  it('should calculate the correct total pay', () => {
    const result = getWeeklyTotals(weekData)
    expect(result[0].startingMiles).toBe(100)
    expect(result[0].endingMiles).toBe(200)
    expect(result[0].totalMiles).toBe(21)
    expect(result[0].payMiles).toBe(22)
    expect(result[0].finalMiles).toBe(22)
    expect(result[0].backhaul).toBe(12.5)
    expect(result[0].totalPay).toBe(23.83)
    expect(currency(result[0].totalPay).format()).toBe('$23.83')
  })
})

describe('computePay', () => {
  it('should return a number', () => {
    const result = computePay({
      totalMiles: 10,
      payMiles: 10,
      backhaul: 0,
    })
    expect(result).toBeInstanceOf(currency)
  })

  it('should calculate the correct pay', () => {
    const result = computePay({
      totalMiles: 10,
      payMiles: 10,
      backhaul: 0,
    })
    expect(result.value).toBe(5.15)

    expect(currency(result).format()).toBe('$5.15')
  })
})

describe('computeFinalMiles', () => {
  it('should return the greater of totalMiles and payMiles', () => {
    const result = computeFinalMiles({
      totalMiles: 10,
      payMiles: 20,
    })
    expect(result).toBe(20)
  })
})
