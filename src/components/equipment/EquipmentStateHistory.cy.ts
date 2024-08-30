import EquipmentStateHistory from './EquipmentStateHistory.vue'

it('Renders the state history list info correctly', () => {
  const operating: EquipmentHistoryState = {
    color: 'rgb(255, 0, 0)',
    date: '30/08/2024',
    status: 'Operando'
  }

  cy.mount(EquipmentStateHistory, { props: { equipmentStateHistory: [operating] } })

  cy.get('[data-cy=equipment-state-color]').should('have.css', 'color', operating.color)
  cy.get('[data-cy=equipment-state-date]').should('have.text', operating.date)
  cy.get('[data-cy=equipment-state-status]').should('have.text', operating.status)
})
