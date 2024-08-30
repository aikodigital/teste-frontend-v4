import EquipmentPositionHistory from './EquipmentPositionHistory.vue'

it('Renders the state history list info correctly', () => {
  const position: EquipmentPosition = {
    date: '30/08/2024',
    lat: -20.24083,
    lon: -30.082024
  }

  cy.mount(EquipmentPositionHistory, { props: { equipmentPositionHistory: [position] } })

  cy.get('[data-cy=equipment-position-date]').should('have.text', position.date)
  cy.get('[data-cy=equipment-position-lat]').should('have.text', `Lat: ${position.lat}`)
  cy.get('[data-cy=equipment-position-lon]').should('have.text', `Lon: ${position.lon}`)
})
