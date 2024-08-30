import type { Equipment } from '~/types/types'

export const mockedEquipment: Equipment = {
  id: '1',
  name: 'Equipment 1',
  model: 'Model 1',
  modelId: '1',
  positionHistory: [{ date: '2021-01-01', lat: -19.126536, lon: -45.947756 }],
  stateHistory: [{ date: '2021-01-01', equipmentStateId: '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f' }],
  lastState: { date: '2021-01-01', equipmentStateId: '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f' },
  lastPosition: { date: '2021-01-01', lat: -19.126536, lon: -45.947756 },
}
