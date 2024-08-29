import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import BarraLateral from './containers/BarraLateral'
import MapaLocalizacao from './containers/MapaLocalizacao'
import EstiloGlobal, {
  Container,
  MainContent,
  ChartsContainer,
  ChartCard,
  ChartWrapper
} from './styles'
import equipmentData from './data/equipment.json'
import equipmentStateHistoryData from './data/equipmentStateHistory.json'
import equipmentStateData from './data/equipmentState.json'
import equipmentModelData from './data/equipmentModel.json'
import EarningsChart from './utils/GanhoEquipamento'
import ProductivityChart from './utils/ProdutividadeEquipamento'

type Contadores = {
  operando: number
  parado: number
  manutencao: number
  total: number
  caminhaoDeCarga: number
  harvester: number
  garraTracadora: number
}

function App() {
  const [filtro, setFiltro] = useState<string>('todas')
  const [busca, setBusca] = useState<string>('')
  const [contadores, setContadores] = useState<Contadores>({
    operando: 0,
    parado: 0,
    manutencao: 0,
    total: 0,
    caminhaoDeCarga: 0,
    harvester: 0,
    garraTracadora: 0
  })

  useEffect(() => {
    setContadores(contarEquipamentos())
  }, [])

  const contarEquipamentos = (): Contadores => {
    const estadosMap = criarMapa(equipmentStateData, 'id', 'name')
    const modelosMap = criarMapa(equipmentModelData, 'id', 'name')

    const contagemEstados = contarEstados(equipmentStateHistoryData, estadosMap)
    const contagemModelos = contarModelos(equipmentData, modelosMap)

    return {
      ...contagemEstados,
      total: equipmentData.length,
      ...contagemModelos
    }
  }

  return (
    <>
      <EstiloGlobal />
      <Header busca={busca} setBusca={setBusca} />
      <Container>
        <BarraLateral
          filtro={filtro}
          setFiltro={setFiltro}
          contadores={contadores}
        />
        <MainContent>
          <MapaLocalizacao filtro={filtro} busca={busca} />
          <ChartsContainer>
            <ChartCard>
              <ChartWrapper>
                <EarningsChart />
              </ChartWrapper>
            </ChartCard>
            <ChartCard>
              <ChartWrapper>
                <ProductivityChart />
              </ChartWrapper>
            </ChartCard>
          </ChartsContainer>
        </MainContent>
      </Container>
    </>
  )
}

const criarMapa = (
  data: any[],
  keyField: string,
  valueField: string
): Record<string, string> =>
  data.reduce((acc, item) => {
    acc[item[keyField]] = item[valueField].toLowerCase()
    return acc
  }, {} as Record<string, string>)

const contarEstados = (
  historyData: any[],
  estadosMap: Record<string, string>
) => {
  const counts = { operando: 0, parado: 0, manutencao: 0 }

  historyData.forEach(({ states }) => {
    const ultimoEstado = states[states.length - 1]
    const estadoAtual = estadosMap[ultimoEstado.equipmentStateId]

    if (estadoAtual === 'operando') counts.operando += 1
    if (estadoAtual === 'parado') counts.parado += 1
    if (estadoAtual === 'manutenção') counts.manutencao += 1
  })

  return counts
}

const contarModelos = (data: any[], modelosMap: Record<string, string>) => {
  const counts = { caminhaoDeCarga: 0, harvester: 0, garraTracadora: 0 }

  data.forEach(({ equipmentModelId }) => {
    const modelo = modelosMap[equipmentModelId]

    if (modelo.includes('caminhão de carga')) counts.caminhaoDeCarga += 1
    if (modelo.includes('harvester')) counts.harvester += 1
    if (modelo.includes('garra traçadora')) counts.garraTracadora += 1
  })

  return counts
}

export default App
