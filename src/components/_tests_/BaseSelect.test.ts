import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SelectComponent from '@/components/BaseSelect.vue'
import { Quasar } from 'quasar'

describe('SelectComponent', () => {
  it('should render with default props', () => {
    const wrapper = mount(SelectComponent, {
      props: {
        modelValue: '',
        options: []
      },
      global: {
        plugins: [Quasar]
      }
    })

    const select = wrapper.find('input.q-select__focus-target')
    expect(select.exists()).toBe(true)
    expect(wrapper.classes()).toContain('q-field--outlined')
    expect(wrapper.classes()).toContain('q-field--dense')
  })

  it('should render with provided options', () => {
    const options = [
      { label: 'Opção 1', value: 'opcao1' },
      { label: 'Opção 2', value: 'opcao2' }
    ]
    const wrapper = mount(SelectComponent, {
      props: {
        modelValue: '',
        options
      },
      global: {
        plugins: [Quasar]
      }
    })

    const select = wrapper.find('input.q-select__focus-target')
    expect(select.exists()).toBe(true)
    expect(wrapper.props().options).toEqual(options)
  })
})
