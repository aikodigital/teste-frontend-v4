describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the map correctly', () => {
    cy.get('#map').should('be.visible')
  })
})
