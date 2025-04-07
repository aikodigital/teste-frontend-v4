import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEquipmentStore } from '../equipment'

describe('Equipment Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty state', () => {
    const store = useEquipmentStore()
    expect(store.equipments).toEqual([])
    expect(store.selectedEquipment).toBeNull()
  })

  it('should select equipment', () => {
    const store = useEquipmentStore()
    const equipment = { id: 1, name: 'Test Equipment' }
    
    store.selectEquipment(equipment)
    expect(store.selectedEquipment).toEqual(equipment)
  })

  it('should get equipment details', () => {
    const store = useEquipmentStore()
    
    // Mock data
    store.equipments = [{ id: 1, name: 'Test', equipmentModelId: 1 }]
    store.models = [{ id: 1, name: 'Model 1' }]
    store.positionHistories = [{
      equipmentId: 1,
      positions: [{ lat: 0, lon: 0, date: '2024-04-06' }]
    }]
    
    const details = store.getEquipmentDetails(1)
    expect(details).toHaveProperty('model')
    expect(details.model).toEqual({ id: 1, name: 'Model 1' })
    expect(details).toHaveProperty('lastPosition')
    expect(details.lastPosition).toEqual({ lat: 0, lon: 0, date: '2024-04-06' })
  })
})