import { describe, expect, it } from 'vitest'

import { formatCurrency, formatDate } from '~/utils/formatValue'

describe('formatDate utils', () => {
  it('should format a valid date string to DD/MM/YYYY format', () => {
    const date = '2024-08-29'
    const result = formatDate(date)
    const expected = '29/08/2024'

    expect(result).toBe(expected)
  })

  it('should return "Invalid Date" for an invalid date string', () => {
    const date = 'not-a-date'
    const result = formatDate(date)
    const expected = 'Invalid Date'

    expect(result).toBe(expected)
  })

  it('should format a valid date string with time to DD/MM/YYYY format', () => {
    const date = '2024-08-29T15:30:00Z'
    const result = formatDate(date)
    const expected = '29/08/2024'

    expect(result).toBe(expected)
  })

  it('should format a valid date string with timezone offset to DD/MM/YYYY format', () => {
    const date = '2024-08-29T15:30:00-03:00'
    const result = formatDate(date)
    const expected = '29/08/2024'

    expect(result).toBe(expected)
  })

  it('should return "Invalid Date" for an empty string', () => {
    const date = ''
    const result = formatDate(date)
    const expected = 'Invalid Date'

    expect(result).toBe(expected)
  })
})

describe('formatCurrency utils', () => {
  it('formatCurrency should format value to Brazilian currency', () => {
    const currency = 'BRL'
    const value = 120

    const result = formatCurrency(value, currency)

    const formattedString = new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value)

    expect(result).toBe(formattedString)
  })

  it('formatCurrency should format decimal values to Brazilian currency', () => {
    const currency = 'BRL'
    const value = 1234.56

    const result = formatCurrency(value, currency)

    const formattedString = new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value)

    expect(result).toBe(formattedString)
  })

  it('formatCurrency should format negative value to Brazilian currency', () => {
    const currency = 'BRL'
    const value = -120

    const result = formatCurrency(value, currency)

    const formattedString = new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value)

    expect(result).toBe(formattedString)
  })

  it('formatCurrency should format large value to Brazilian currency', () => {
    const currency = 'BRL'
    const value = 1000000000

    const result = formatCurrency(value, currency)

    const formattedString = new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value)

    expect(result).toBe(formattedString)
  })

  it('formatCurrency should handle invalid currency code', () => {
    const currency = 'INVALID'
    const value = 120

    expect(() => formatCurrency(value, currency)).toThrowError()
  })
})
