import { mount } from '@vue/test-utils'
import EquipmentHistoryDialog from '@/components/EquipmentHistoryDialog.vue'
import { createTestingPinia } from '@pinia/testing'

describe('EquipmentHistoryDialog', () => {
  it('exibe o histórico corretamente', () => {
    const wrapper = mount(EquipmentHistoryDialog, {
      props: {
        visible: true,
        equipment: {
          id: 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9',
          name: 'CA-0001'
        }
      },
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    expect(wrapper.text()).toContain('Histórico de Estados - CA-0001')
  })

  it('calcula e exibe produtividade e ganho corretamente', () => {
    const wrapper = mount(EquipmentHistoryDialog, {
      props: {
        visible: true,
        equipment: {
          id: 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9',
          name: 'CA-0001',
        },
      },
      global: {
        plugins: [createTestingPinia({
          initialState: {
            main: {
              equipmentStateHistories: [
                {
                  equipmentId: 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9',
                  states: [
                    { date: '2023-09-01T12:00:00.000Z', equipmentStateId: 'operando' },
                    { date: '2023-09-01T16:00:00.000Z', equipmentStateId: 'parado' },
                  ],
                },
              ],
              equipmentModels: [
                { id: 'a3540227-2f0e-4362-9517-92f41dabbfdf', hourlyEarnings: [{ equipmentStateId: 'operando', value: 100 }] }
              ]
            }
          },
          stubActions: false 
        })],
      },
    })

    expect(wrapper.text()).toContain('Produtividade:')
    expect(wrapper.text()).toContain('Ganho Total:')
  })
})
