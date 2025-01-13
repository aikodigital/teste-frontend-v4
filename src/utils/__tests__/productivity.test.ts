import { describe, it, expect } from 'vitest'
import {
  calculateProductivity,
  calculateTotalHours,
  calculateTotalOperatingTime,
  calculateDailyProductivity,
} from '../productivity'

describe('Productivity functions', () => {
  describe('calculateProductivity', () => {
    it('should calculate productivity correctly', () => {
      const result = calculateProductivity(5, 10)
      expect(result).toBe(50.0)
    })

    it('should handle edge cases for valid input', () => {
      const result = calculateProductivity(10, 10)
      expect(result).toBe(100.0)
    })

    it('should throw an error for invalid input', () => {
      expect(() => calculateProductivity(-5, 10)).toThrow(
        'Operating hour values or total hours are not valid.',
      )
      expect(() => calculateProductivity(5, 0)).toThrow(
        'Operating hour values or total hours are not valid.',
      )
      expect(() => calculateProductivity(15, 10)).toThrow(
        'Operating hour values or total hours are not valid.',
      )
    })
  })

  describe('calculateTotalHours', () => {
    it('should calculate total hours for a specific month', () => {
      const result = calculateTotalHours(2024, 2)
      expect(result).toBe(29 * 24)
    })

    it('should calculate total hours for a year', () => {
      const result = calculateTotalHours(2024)
      expect(result).toBe(366 * 24)
    })
  })

  describe('calculateTotalOperatingTime', () => {
    it('should calculate total operating time correctly', () => {
      const states = [
        { date: '2025-01-01T10:00:00Z', equipmentStateId: '1' },
        { date: '2025-01-01T12:00:00Z', equipmentStateId: '1' },
        { date: '2025-01-01T14:00:00Z', equipmentStateId: '2' },
      ]
      const result = calculateTotalOperatingTime(states, '1')
      expect(result).toBe(2)
    })

    it('should return 0 if no operating state matches', () => {
      const states = [
        { date: '2025-01-01T10:00:00Z', equipmentStateId: '2' },
        { date: '2025-01-01T12:00:00Z', equipmentStateId: '2' },
      ]
      const result = calculateTotalOperatingTime(states, '1')
      expect(result).toBe(0)
    })

    it('should return 0 for an empty state array', () => {
      const result = calculateTotalOperatingTime([], '1')
      expect(result).toBe(0)
    })
  })

  describe('calculateDailyProductivity', () => {
    it('should calculate daily productivity correctly', () => {
      const states = [
        { date: '2025-01-01T10:00:00Z', equipmentStateId: '1' },
        { date: '2025-01-01T12:00:00Z', equipmentStateId: '1' },
        { date: '2025-01-02T08:00:00Z', equipmentStateId: '1' },
        { date: '2025-01-02T10:00:00Z', equipmentStateId: '1' },
      ]

      const result = calculateDailyProductivity(states, '1')
      expect(result).toEqual([
        { date: '2025-01-01', hours: 2 },
        { date: '2025-01-02', hours: 2 },
      ])
    })

    it('should return an empty array for no matching states', () => {
      const states = [
        { date: '2025-01-01T10:00:00Z', equipmentStateId: '2' },
        { date: '2025-01-01T12:00:00Z', equipmentStateId: '2' },
      ]

      const result = calculateDailyProductivity(states, '1')
      expect(result).toEqual([])
    })

    it('should handle overlapping dates and group them correctly', () => {
      const states = [
        { date: '2025-01-01T10:00:00Z', equipmentStateId: '1' },
        { date: '2025-01-01T11:00:00Z', equipmentStateId: '1' },
        { date: '2025-01-01T12:00:00Z', equipmentStateId: '1' },
      ]

      const result = calculateDailyProductivity(states, '1')
      expect(result).toEqual([{ date: '2025-01-01', hours: 2 }])
    })
  })
})
