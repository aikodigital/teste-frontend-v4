describe('Comportamento do Mapa', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Renderiza o filtro e a busca de equipamentos corretamente', () => {
    cy.get('input[placeholder="Pesquisar equipamento"]').should('be.visible')
    cy.get('.dropdown').should('have.length', 2)
  })

  it('Renderiza o mapa corretamente', () => {
    cy.get('.leaflet-container').should('be.visible')
  })

  it('Renderiza os marcadores para os equipamentos', () => {
    cy.get('.leaflet-marker-icon').should('have.length.at.least', 1)
  })

  it('Deve abrir o popup ao clicar em um marcador e mostrar os dados do popup', () => {
    cy.get('.leaflet-marker-icon').first().click()
    cy.get('[role="dialog"]').within(() => {
      cy.get('[data-pc-section="title"]').should('be.visible')
      cy.contains('Modelo').should('be.visible')
      cy.contains('Modelo ID').should('be.visible')
      cy.contains('Estado atual:').should('be.visible')
      cy.contains('button', 'Ver histórico de estados').should('be.visible').click();
      cy.get('table[role="table"]').should('be.visible');
      cy.contains('Histórico de Estados').should('be.visible')
      cy.contains('Data').should('be.visible')
      cy.contains('Estado', { timeout: 10000 }).should('not.be.disabled')
      cy.contains('ID do Estado').should('be.visible')
      cy.contains('Valor por Hora').should('be.visible')
      cy.wait(2000)
      cy.get('button[aria-label="Close"]').should('be.visible').first().click({ force: true });
      cy.get('[role="dialog"]').should('not.exist')     
    })
  })
})


describe('Componentes: Filtro e Busca', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Renderiza os dropdowns corretamente', () => {
    cy.get('.dropdown').should('have.length', 2)
  })

  it('Deve filtrar por estado', () => {
    cy.get('#pv_id_1').click()
    cy.contains('Operando').should('be.visible').click()
    cy.get('.leaflet-marker-icon').click()
    cy.wait(500); 
    cy.get('button[type="button"]').first().click()
    cy.get('#pv_id_1').click()
    cy.contains('Todos os estado').should('be.visible').click()
  })

  it('Deve filtrar por modelo', () => {
    cy.get('#pv_id_2').click()
    cy.contains('Escavadeira').should('be.visible').click()
    cy.get('.leaflet-marker-icon').click()
    cy.wait(500);
    cy.get('button[type="button"]').first().click()
    cy.get('#pv_id_2').click()
    cy.contains('Todos os modelos').should('be.visible').click()
  })

  it('Deve filtrar equipamentos ao digitar algo no campo de pesquisa', () => {
    cy.wait(500); 
    cy.get('input[placeholder="Pesquisar equipamento"]').type('T')
    cy.wait(500); 
    cy.get('.leaflet-marker-icon').click()
    cy.get('button[type="button"]').first().click()
    cy.get('input[placeholder="Pesquisar equipamento"]').clear()
  })})