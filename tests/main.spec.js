import { setActivePinia, createPinia } from 'pinia'
import { useMainStore } from '@/stores/main'
import equipmentData from '@/data/equipment.json'
import equipmentModelData from '@/data/equipmentModel.json'

describe('Main Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('carrega os dados corretamente', () => {
    const store = useMainStore()
    store.loadData()

    expect(store.equipments).toEqual(equipmentData)
    expect(store.equipmentModels).toEqual(equipmentModelData)
  })

  it('calcula a produtividade corretamente', () => {
    const store = useMainStore()
    store.loadData()

    const productivity = store.getEquipmentProductivity('a7c53eb1-4f5e-4eba-9764-ad205d0891f9')
    expect(productivity).toBeGreaterThanOrEqual(0)
    expect(productivity).toBeLessThanOrEqual(100)
  })

  it('calcula o ganho total corretamente', () => {
    const store = useMainStore()
    store.loadData()

    const earnings = store.getEquipmentEarnings('a7c53eb1-4f5e-4eba-9764-ad205d0891f9')
    expect(earnings).toBeGreaterThanOrEqual(0)
  })
})
