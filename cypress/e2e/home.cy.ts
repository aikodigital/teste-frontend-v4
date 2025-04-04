describe('Página Inicial', () => {
  it('Deve exibir a logo', () => {
    cy.visit('/')
    cy.get('#Logo').should('exist')
  })
  it('Deve exibir o mapa', () => {
    cy.visit('/')
    cy.get('#mapa').should('exist')
  })
})
