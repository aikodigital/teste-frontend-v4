import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ToggleComponent from '@/components/BaseToggle.vue'
import { Quasar } from 'quasar'

describe('ToggleComponent', () => {
  it('should render with default props', () => {
    const wrapper = mount(ToggleComponent, {
      props: {
        modelValue: false
      },
      global: {
        plugins: [Quasar]
      }
    })

    const toggle = wrapper.find('.q-toggle')
    expect(toggle.exists()).toBe(true)
    expect(toggle.attributes('aria-checked')).toBe('false')
  })

  it('should render with provided label', () => {
    const label = 'Agrupar em clusters'
    const wrapper = mount(ToggleComponent, {
      props: {
        modelValue: false,
        label
      },
      global: {
        plugins: [Quasar]
      }
    })

    const toggleLabel = wrapper.find('.q-toggle__label')
    expect(toggleLabel.exists()).toBe(true)
    expect(toggleLabel.text()).toBe(label)
  })
})
