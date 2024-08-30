import EquipmentDetail from './EquipmentDetails.vue'

it('Renders the detail info correctly', () => {
  const gains = 'R$ 202.408,30'
  const productivity = 50

  cy.mount(EquipmentDetail, { props: { gains, productivity } })

  cy.get('[data-cy=equipment-details-gains]').should('have.text', gains)
  cy.get('[data-cy=equipment-details-productivity]').within(() => {
    cy.get('.p-progressbar-label').should('have.text', `${productivity}%`)
  })
})
