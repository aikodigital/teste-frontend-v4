import { calculateDynamicCenter } from '../MapComponent.vue'
import { describe, expect, it } from 'vitest'

describe('calculateDynamicCenter', () => {
  it('should return default center when no valid positions', () => {
    const equipment = []
    const result = calculateDynamicCenter(equipment)
    expect(result).toEqual([-15.788, -47.879])
  })

  it('should calculate correct center for single position', () => {
    const equipment = [{ lat: -23.5505, lon: -46.6333 }] // São Paulo
    const result = calculateDynamicCenter(equipment)
    expect(result).toBeCloseToArray([-23.5505, -46.6333], 4)
  })

  it('should calculate centroid for multiple positions', () => {
    const equipment = [
      { lat: -23.5505, lon: -46.6333 }, // SP
      { lat: -22.9068, lon: -43.1729 }, // RJ
      { lat: -19.9167, lon: -43.9345 }  // BH
    ]
    const result = calculateDynamicCenter(equipment)
    expect(result).toBeCloseToArray([-22.1247, -44.5802], 4)
  })

  it('should ignore invalid coordinates', () => {
    const equipment = [
      { lat: 'invalid', lon: null },
      { lat: -23.5505, lon: -46.6333 }
    ]
    const result = calculateDynamicCenter(equipment)
    expect(result).toBeCloseToArray([-23.5505, -46.6333], 4)
  })
})

// Extensão para comparação de arrays
expect.extend({
  toBeCloseToArray(received, expected, precision = 2) {
    const round = (num) => Number(num.toFixed(precision))
    const receivedRounded = received.map(round)
    const expectedRounded = expected.map(round)
    
    return {
      pass: this.equals(receivedRounded, expectedRounded),
      message: () => 
        `Expected: ${expectedRounded}\nReceived: ${receivedRounded}`
    }
  }
})