/// <reference types="cypress" />

describe('Verificação dos Filtros e Legenda', () => {
  beforeEach(() => {
    // Visita a URL da aplicação antes de cada teste
    cy.visit('https://test-phi-murex.vercel.app/')
  })

  it('Verifica se ao filtrar por estado de esquipamento aracem todos', () => {
    cy.contains('Operando').click() // Clica no filtro "Operando"
    cy.contains('Parado').click() // Clica no filtro "Operando"
    cy.contains('Manutenção').click() // Clica no filtro "Operando"
  })

  it('Verifica se os filtros de modelos de Equipamento funcionam correctamente', () => {
    cy.contains('Caminhão de Carga').click() // Clica no filtro "Manutenção"
    cy.contains('Harvester').click() // Clica no filtro "Manutenção"
    cy.contains('Garra Traçadora').click() // Clica no filtro "Manutenção"
  })
})
