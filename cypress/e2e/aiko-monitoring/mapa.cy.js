/// <reference types="cypress" />

describe('MapaLocalizacao - Marcadores', () => {
  beforeEach(() => {
    cy.visit('https://test-phi-murex.vercel.app/')
  })

  it('Deve exibir um tooltip ao passar o mouse sobre um marcador no mapa', () => {
    // Visita a página onde o mapa está localizado
  })

  it('Deve carregar os marcadores no mapa', () => {
    cy.get('.leaflet-marker-icon').should('have.length.greaterThan', 0) // Verifica se os marcadores estão presentes
  })
})
