import styled from 'styled-components'
import { Props } from '.'

type PropsSemLegendaEContador = Omit<Props, 'contador' | 'legenda'>
export const Card = styled.div<PropsSemLegendaEContador>`
  padding: 8px;
  border: 2px solid ${(props) => (props.ativo ? '#1E90FF' : '#a1a1a1')};
  background-color: #fcfcfc;
  color: #5e5e5e;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: #1e90ff;
  }
`
export const Contador = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: block;
`
export const Label = styled.span`
  font-size: 14px;
`
