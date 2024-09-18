'use client'

import { styled } from 'styled-components'

interface typeStatus {
  $status: string
}

const backgroundColor = (status: string) => {
  switch (status) {
    case 'Operando':
      return '#C9F1E8'
    case 'Manutenção':
      return '#FFEFD6'
    case 'Parado':
      return '#FFE2E7'
    default:
      return 'gray'
  }
}

const colorText = (status: string) => {
  switch (status) {
    case 'Operando':
      return '#008767'
    case 'Manutenção':
      return '#A44900'
    case 'Parado':
      return '#BE1634'
    default:
      return 'gray'
  }
}

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;

  width: 70%;
  table-layout: fixed;
  color: #b3b2b8;
  border: 1px solid #e1e1e1;

  tr {
    display: flex;
  }
`

export const Head = styled.thead`
  border-top: none;
`
export const TableBody = styled.tbody``

export const Header = styled.th`
  padding: 1.9rem 3.5rem;
  white-space: nowrap;

  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: 20%;
  background: #f0f0f0;
  border: 1px solid #f0f0f0;
  font-size: 2rem;
  font-weight: 700;
`
export const Row = styled.tr`
  background: white;
  border-top: 1px solid #e1e1e1;
  font-size: 2rem;
  font-weight: 400;
  justify-content: space-between;
`
export const RowHeader = styled.tr`
  background: white;
  border-top: 1px solid #e1e1e1;
  font-size: 2rem;
  font-weight: 400;
  justify-content: space-between;
`
export const Data = styled.td`
  padding: 1.9rem 3.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;

  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: 20%;
  font-weight: 500;
  color: black;
`

export const ActionColumnTH = styled(Header)`
  gap: 1.2rem;
`
export const ActionColumnTD = styled(Data)`
  gap: 1.2rem;
  color: #3a4559;
  font-weight: 500;
  font-size: 2rem;
`
export const Tag = styled.div<typeStatus>`
  background-color: ${props => backgroundColor(props.$status)};
  padding: 0.8rem;
  border-radius: 1rem;
  color: ${props => colorText(props.$status)};
`
