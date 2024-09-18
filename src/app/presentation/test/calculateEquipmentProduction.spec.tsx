import { calculateEquipmentProduction } from '../modules/DetailSection'

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

describe('Equipment Productivity Calculation', () => {
  it('should correctly calculate the productivity percentage based on equipment states', () => {
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

    const result = calculateEquipmentProduction(mockEquipments)

    expect(result[0]).toBe('33.33')
  })
})
