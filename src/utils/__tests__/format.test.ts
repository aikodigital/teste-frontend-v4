import { describe, it, expect } from 'vitest'
import { formatDate } from '@/utils/format'

describe('formatDate', () => {
  it('should format ISO date correctly', () => {
    const isoDate = '2024-01-10T18:50:00.000Z'
    const formattedDate = formatDate(isoDate)

    expect(formattedDate).toBe('10/01/2024 18:50')
  })

  it('should handle single-digit day and month correctly', () => {
    const isoDate = '2024-01-05T07:05:00.000Z'
    const formattedDate = formatDate(isoDate)

    expect(formattedDate).toBe('05/01/2024 07:05')
  })

  it('should handle different times correctly', () => {
    const isoDate = '2024-01-10T00:00:00.000Z'
    const formattedDate = formatDate(isoDate)

    expect(formattedDate).toBe('10/01/2024 00:00')
  })

  it('should handle invalid date input gracefully', () => {
    const isoDate = 'invalid-date'
    const formattedDate = formatDate(isoDate)

    expect(formattedDate).toBe(null)
  })
})
