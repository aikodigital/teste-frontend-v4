import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Component from '@/components/equipment/EquipmentComponent.vue' // ajusta la ruta de tu componente
import Card from 'primevue/card'
import OverlayBadge from 'primevue/overlaybadge'

describe('Component', () => {
  it('should render correctly with props', () => {
    const wrapper = mount(Component, {
      props: {
        equipmentName: 'Excavadora',
        equipmentModelName: 'XC-1000',
        equipmentStateName: 'Operando',
        equipmentStateColor: '#4caf50',
      },
    })

    expect(wrapper.find('h3').text()).toContain('Excavadora')
    expect(wrapper.find('p.text-sm').text()).toBe('Operando')
    expect(wrapper.find('p').classes()).toContain('text-[#4caf50]')
  })

  it('should add the correct CSS class for the selected state', () => {
    const wrapper = mount(Component, {
      props: {
        selected: true,
      },
    })

    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('border-gray-700')
  })

  it('should not have the selected class when not selected', () => {
    const wrapper = mount(Component, {
      props: {
        selected: false,
      },
    })

    expect(wrapper.classes()).not.toContain('border')
  })

  it('should emit an event when clicked', async () => {
    const wrapper = mount(Component, {
      props: {
        id: '123',
      },
    })

    await wrapper.findComponent(Card).trigger('click')
    expect(wrapper.emitted('onClick')).toBeTruthy()
    expect(wrapper.emitted('onClick')![0]).toEqual(['123'])
  })

  it('should render correct badge severity based on state', () => {
    const wrapper = mount(Component, {
      props: {
        equipmentStateName: 'Parado',
      },
    })

    const badge = wrapper.findComponent(OverlayBadge)
    expect(badge.props('severity')).toBe('warn')
  })

  it('should display the correct model name', () => {
    const wrapper = mount(Component, {
      props: {
        equipmentName: 'Excavadora',
        equipmentModelName: 'XC-2000',
      },
    })

    expect(wrapper.find('span.text-xs.text-gray-500').text()).toBe('(XC-2000)')
  })
})
