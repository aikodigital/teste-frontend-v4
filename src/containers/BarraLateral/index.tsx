import React from 'react'
import FiltroCard from '../../components/FiltroCard'
import * as S from './styles'
import operandoIcon from '../../assets/icon-operando.png'
import paradoIcon from '../../assets/icon-parado.png'
import manutencaoIcon from '../../assets/icon-manutencao.png'

export type Props = {
  filtro: string
  setFiltro: (filtro: string) => void
  contadores: {
    operando: number
    parado: number
    manutencao: number
    total: number
    caminhaoDeCarga: number
    harvester: number
    garraTracadora: number
  }
}

const BarraLateral = ({ filtro, setFiltro, contadores }: Props) => (
  <S.Aside>
    <div>
      <S.LegendaHeading>Estado Equipamento</S.LegendaHeading>
      <S.Filtros>
        <FiltroCard
          legenda="Operando"
          contador={contadores.operando}
          ativo={filtro === 'operando'}
          onClick={() => setFiltro('operando')}
        />
        <FiltroCard
          legenda="Parado"
          contador={contadores.parado}
          ativo={filtro === 'parado'}
          onClick={() => setFiltro('parado')}
        />
        <FiltroCard
          legenda="Manutenção"
          contador={contadores.manutencao}
          ativo={filtro === 'manutenção'}
          onClick={() => setFiltro('manutenção')}
        />
        <FiltroCard
          legenda="Todas"
          contador={contadores.total}
          ativo={filtro === 'todas'}
          onClick={() => setFiltro('todas')}
        />
      </S.Filtros>

      <S.Separator />

      <S.LegendaHeading>Modelo Equipamento</S.LegendaHeading>
      <S.Filtros>
        <FiltroCard
          legenda="Caminhão de Carga"
          contador={contadores.caminhaoDeCarga}
          ativo={filtro === 'caminhão de carga'}
          onClick={() => setFiltro('caminhão de carga')}
        />
        <FiltroCard
          legenda="Harvester"
          contador={contadores.harvester}
          ativo={filtro === 'harvester'}
          onClick={() => setFiltro('harvester')}
        />
        <FiltroCard
          legenda="Garra Traçadora"
          contador={contadores.garraTracadora}
          ativo={filtro === 'garra traçadora'}
          onClick={() => setFiltro('garra traçadora')}
        />
      </S.Filtros>

      <S.Separator />

      <S.LegendaHeading>Legenda</S.LegendaHeading>
      <S.Legenda>
        <S.IconWithText>
          <S.Icon src={operandoIcon} alt="Operando" />
          <span>Operando</span>
        </S.IconWithText>
        <S.IconWithText>
          <S.Icon src={paradoIcon} alt="Parado" />
          <span>Parado</span>
        </S.IconWithText>
        <S.IconWithText>
          <S.Icon src={manutencaoIcon} alt="Manutenção" />
          <span>Manutenção</span>
        </S.IconWithText>
      </S.Legenda>
    </div>
  </S.Aside>
)

export default BarraLateral
