import EquipmentComponent from './EquipmentComponent.vue'

describe('<EquipmentComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(EquipmentComponent)
  })
})