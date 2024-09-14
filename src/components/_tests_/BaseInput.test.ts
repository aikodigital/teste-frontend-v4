import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import InputComponent from '@/components/BaseInput.vue'
import { Quasar } from 'quasar'

describe('InputComponent', () => {
  it('should render with default props', () => {
    const wrapper = mount(InputComponent, {
      props: {
        modelValue: ''
      },
      global: {
        plugins: [Quasar]
      }
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBeUndefined()
    expect(wrapper.classes()).toContain('q-field--outlined')
    expect(wrapper.classes()).toContain('q-field--dense')
  })

  it('should update modelValue on input change', async () => {
    const updateModelValue = vi.fn()
    const wrapper = mount(InputComponent, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': updateModelValue
      },
      global: {
        plugins: [Quasar]
      }
    })

    const input = wrapper.find('input')
    await input.setValue('Novo valor')

    expect(updateModelValue).toHaveBeenCalledWith('Novo valor')
  })

  it('should render with provided props', () => {
    const placeholder = 'Busque por qualquer termo'
    const wrapper = mount(InputComponent, {
      props: {
        modelValue: '',
        placeholder
      },
      global: {
        plugins: [Quasar]
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe(placeholder)
  })
})
