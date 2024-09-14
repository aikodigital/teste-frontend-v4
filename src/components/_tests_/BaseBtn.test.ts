import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseButton from '@/components/BaseBtn.vue'
import { Quasar } from 'quasar'

describe('BaseButton Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(BaseButton, {
      global: {
        plugins: [Quasar]
      }
    })

    const button = wrapper.find('.base-btn')
    expect(button.exists()).toBe(true)
    expect(button.classes()).toContain('bg-primary')
    expect(button.classes()).toContain('q-btn--no-uppercase')
    expect(button.classes()).toContain('q-btn--unelevated')
  })

  it('renders with custom props', () => {
    const wrapper = mount(BaseButton, {
      props: {
        label: 'Click Me',
        icon: 'add'
      },
      global: {
        plugins: [Quasar]
      }
    })

    const button = wrapper.find('.base-btn')
    expect(button.text()).toContain('Click Me')
    expect(button.find('i.q-icon').text()).toBe('add')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      global: {
        plugins: [Quasar]
      }
    })

    await wrapper.find('.base-btn').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })
})
