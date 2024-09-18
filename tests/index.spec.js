import { mount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'
import { createTestingPinia } from '@pinia/testing'

describe('IndexPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(IndexPage, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
  })

  it('exibe o título corretamente', () => {
    expect(wrapper.text()).toContain('Gestão de Equipamentos Florestais')
  })

  it('exibe o campo de pesquisa de equipamento corretamente', () => {
    const searchField = wrapper.find('v-text-field[placeholder="Digite o nome do equipamento"]')
    expect(searchField.exists()).toBe(true)
  })

  it('exibe o filtro de estado corretamente', () => {
    const stateSelect = wrapper.find('v-select[label="Filtrar por Estado"]')
    expect(stateSelect.exists()).toBe(true)
  })

  it('exibe o filtro de modelo corretamente', () => {
    const modelSelect = wrapper.find('v-select[label="Filtrar por Modelo"]')
    expect(modelSelect.exists()).toBe(true)
  })
})
