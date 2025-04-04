describe('Mapa', () => {
  it('Deve exibir informações do equipamento', () => {
    cy.visit('/')
    cy.get('.Marcador').first().click()
    cy.get('#Equipamento').should('be.visible')
  })
  it('Deve excluir todos os marcadores', () => {
    cy.visit('/')
    cy.get('.Filtro .Campo > input[type="text"]').type('QWERTY12345')
    cy.get('.Marcador').should('not.exist')
  })
  it('Deve reduzir os marcadores', () => {
    cy.visit('/')
    cy.get('.Marcador')
      .its('length')
      .then((quantidadeInicial) => {
        cy.get('.Filtro .Campo > input[type="text"]').type('CA')
        cy.get('.Marcador')
          .its('length')
          .then((quantidadeFinal) => {
            expect(quantidadeInicial).not.to.equal(quantidadeFinal)
          })
      })
  })
})
