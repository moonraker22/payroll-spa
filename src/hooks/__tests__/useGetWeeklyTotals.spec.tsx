import { renderHook, act } from '@testing-library/react'
import { useGetWeeklyTotals } from '@/hooks/useGetWeeklyTotals'
import { describe, expect, it } from 'vitest'

/**
 * @vitest-environment happy-dom
 */

describe('useGetWeeklyTotals', () => {
  it('should render', () => {
    const { result } = renderHook(() => useGetWeeklyTotals())
    expect(result.current).toBeTruthy()
  })

  it('should return an array of weeks', () => {
    const { result } = renderHook(() => useGetWeeklyTotals())
    expect(result.current.weeks).toBeInstanceOf(Array)
  })
})
