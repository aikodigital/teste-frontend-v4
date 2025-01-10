import type { Meta, StoryObj } from '@storybook/vue3';

import EquipmentComponent from './EquipmentComponent.vue';
import { Card, OverlayBadge } from 'primevue';

const meta: Meta<typeof EquipmentComponent> = {
  component: EquipmentComponent,
};

export default meta;
type Story = StoryObj<typeof EquipmentComponent>;

export const EquipmentComponentRender: Story = {
  render: (args) => ({
    components: { EquipmentComponent, OverlayBadge, Card },
    setup() {
      return { args };
    },
    template: '<EquipmentComponent v-bind="args" />',
  }),
  args: {
    id: '1',
    equipmentName: 'Excavadora',
    equipmentModelName: 'XC-1000',
    equipmentStateName: 'Operando',
    equipmentStateColor: '#4caf50',
    stateName: 'Operando',
  },
};

export const EquipmentComponentRenderSelected: Story = {
  render: (args) => ({
    components: { EquipmentComponent, OverlayBadge, Card },
    setup() {
      return { args };
    },
    template: '<EquipmentComponent v-bind="args" />',
  }),
  args: {
    id: '1',
    equipmentName: 'Excavadora',
    equipmentModelName: 'XC-1000',
    equipmentStateName: 'Operando',
    equipmentStateColor: '#4caf50',
    stateName: 'Operando',
    selected: true,
  },
};
