import React from 'react'
import { HeaderWrapper, LogoWrapper, TitleWrapper, Input } from './styles'
import logo from '../../assets/logo_aiko.png'

export type Props = {
  busca: string
  setBusca: (busca: string) => void
}

const Header = ({ busca, setBusca }: Props) => (
  <HeaderWrapper>
    <LogoWrapper src={logo} alt="aiko" />
    <TitleWrapper>Monitoramento de Equipamentos Florestais</TitleWrapper>
    <Input
      type="text"
      placeholder="Pesquisar..."
      value={busca}
      onChange={(e) => setBusca(e.target.value)}
    />
  </HeaderWrapper>
)

export default Header
