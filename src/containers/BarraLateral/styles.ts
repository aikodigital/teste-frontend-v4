import styled from 'styled-components'

export const Aside = styled.aside`
  padding: 16px;
  background-color: #eee;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Filtros = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

export const Separator = styled.div`
  margin: 16px 0;
  border-bottom: 1px solid #ccc;
`

export const LegendaHeading = styled.h3`
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 1em;
  color: #333;
`

export const Legenda = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`

export const IconWithText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`
