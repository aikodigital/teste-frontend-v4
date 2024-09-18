import { expect, it, describe } from 'vitest'

import { calculateEquipmentGains } from '../modules/DetailSection'

type State = {
  activeState: 'Operando' | 'Manutenção' | 'Parado'
  date: string
  price: {
    value: number
  }
}
type Equipment = {
  equipmentId: string
  states: State[]
}

describe('Equipment Gains Calculation', () => {
  it('should correctly calculate the gains of an equipment based on its state history', () => {
    const mockEquipments: Equipment[] = [
      {
        states: [
          {
            activeState: 'Operando',
            date: '2023-09-15T08:00:00Z',
            price: { value: 100 }
          },
          {
            activeState: 'Manutenção',
            date: '2023-09-15T12:00:00Z',
            price: { value: -50 }
          },
          {
            activeState: 'Parado',
            date: '2023-09-15T16:00:00Z',
            price: { value: 0 }
          },
          {
            activeState: 'Operando',
            date: '2023-09-15T20:00:00Z',
            price: { value: 100 }
          }
        ],
        equipmentId: ''
      }
    ]

    const result = calculateEquipmentGains(mockEquipments)

    expect(result[0].totalGain).toBe(200)
  })
})
