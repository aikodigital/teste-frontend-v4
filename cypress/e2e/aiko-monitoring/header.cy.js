/// <reference types="cypress" />

describe('Testes da Interface Principal', () => {
  beforeEach(() => {
    // Visita a URL da aplicação antes de cada teste
    cy.visit('https://test-phi-murex.vercel.app/')
  })

  it('Verifica se o header está visível na página', () => {
    // Verifica se o header está visível na página
    cy.get('header').should('be.visible')
  })

  it('Renderiza o logo com o texto alternativo correto', () => {
    // Verifica se o logo possui o atributo alt com o valor 'aiko'
    cy.get('img[alt="aiko"]').should('be.visible')
  })

  it('Verifica se existe o campo de busca', () => {
    // Verifica se o campo de busca (input) está presente no header
    cy.get('input[placeholder="Pesquisar..."]').should('be.visible')
  })

  it('Verifica se os filtros de busca estão disponíveis', () => {
    // Verifica se os filtros de estado estão presentes na barra lateral
    cy.get('aside').within(() => {
      cy.contains('Operando').should('be.visible')
      cy.contains('Parado').should('be.visible')
      cy.contains('Manutenção').should('be.visible')
      cy.contains('Todas').should('be.visible')

      // Verifica se os filtros de modelo de equipamento estão presentes
      cy.contains('Caminhão de Carga').should('be.visible')
      cy.contains('Harvester').should('be.visible')
      cy.contains('Garra Traçadora').should('be.visible')
    })
  })

  it('Verifica se o mapa está visível', () => {
    // Verifica se o mapa está visível
    cy.get('.leaflet-container').should('be.visible')
  })

  it('Verifica se os gráficos estão visíveis', () => {
    // Verifica se o gráfico de ganhos está visível
    cy.get('.apexcharts-canvas').first().should('be.visible')

    // Verifica se o gráfico de produtividade está visível
    cy.get('.apexcharts-canvas').last().should('be.visible')
  })
})
