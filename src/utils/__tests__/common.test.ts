import { describe, it, expect } from 'vitest'
import { getLastKnown } from '../common'

describe('getLastKnown', () => {
  it('should return the item with the latest date', () => {
    const items = [
      { id: 1, date: '2025-01-01T10:00:00Z' },
      { id: 2, date: '2025-01-02T10:00:00Z' },
      { id: 3, date: '2025-01-03T10:00:00Z' },
    ]

    const result = getLastKnown(items)
    expect(result).toEqual({ id: 3, date: '2025-01-03T10:00:00Z' })
  })

  it('should return undefined for an empty array', () => {
    const items: { date: string }[] = []
    const result = getLastKnown(items)
    expect(result).toBeUndefined()
  })

  it('should handle an array with a single item', () => {
    const items = [{ id: 1, date: '2025-01-01T10:00:00Z' }]
    const result = getLastKnown(items)
    expect(result).toEqual({ id: 1, date: '2025-01-01T10:00:00Z' })
  })

  it('should handle invalid date formats gracefully', () => {
    const items = [
      { id: 1, date: 'Invalid Date' },
      { id: 2, date: '2025-01-02T10:00:00Z' },
    ]

    const result = getLastKnown(items)
    expect(result).toEqual({ id: 2, date: '2025-01-02T10:00:00Z' })
  })

  it('should return the first item if all dates are invalid', () => {
    const items = [
      { id: 1, date: 'Invalid Date' },
      { id: 2, date: 'Also Invalid' },
    ]

    const result = getLastKnown(items)
    expect(result).toEqual({ id: 1, date: 'Invalid Date' })
  })
})
