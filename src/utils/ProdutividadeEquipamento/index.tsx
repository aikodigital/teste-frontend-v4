import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import equipmentState from '../../data/equipmentState.json'
import equipmentStateHistory from '../../data/equipmentStateHistory.json'

// Definição de tipos para os dados do estado e produtividade
export type EquipmentStateProps = {
  id: string
  name: string
}

export type ProductivityDataProps = {
  day: string
  productivity: number
}

// Função para calcular a produtividade
const calculateProductivity = (
  stateHistory: { date: string; equipmentStateId: string }[],
  stateOperandoId: string
): ProductivityDataProps[] => {
  const oneDay = 24 * 60 * 60 * 1000
  const days: { [key: string]: { operando: number; total: number } } = {}

  stateHistory.forEach((record) => {
    const date = new Date(record.date)
    const day = date.toISOString().split('T')[0]

    if (!days[day]) {
      days[day] = { operando: 0, total: 24 }
    }

    const nextRecord = stateHistory.find(
      (r) =>
        new Date(r.date) > date &&
        r.equipmentStateId !== record.equipmentStateId
    )
    const endTime = nextRecord
      ? new Date(nextRecord.date)
      : new Date(date.getTime() + oneDay)

    const durationHours =
      (endTime.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (record.equipmentStateId === stateOperandoId) {
      days[day].operando += durationHours
    }
  })

  return Object.keys(days).map((day) => ({
    day,
    productivity: (days[day].operando / days[day].total) * 100
  }))
}

const ProductivityChart: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<any>({})
  const [chartSeries, setChartSeries] = useState<
    { name: string; data: number[] }[]
  >([])

  useEffect(() => {
    const stateOperandoId = equipmentState.find(
      (state: EquipmentStateProps) => state.name === 'Operando'
    )?.id
    const productivityData = calculateProductivity(
      equipmentStateHistory[0].states,
      stateOperandoId!
    )

    const categories = productivityData.map((data) => data.day)
    const seriesData = productivityData.map((data) => data.productivity)

    setChartOptions({
      chart: {
        type: 'line'
      },
      colors: ['#3d1690'],
      xaxis: {
        categories: categories
      },
      title: {
        text: 'Produtividade do Equipamento'
      },
      tooltip: {
        shared: true,
        intersect: false
      }
    })

    setChartSeries([
      {
        name: 'Produtividade (%)',
        data: seriesData
      }
    ])
  }, [])

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={450}
      />
    </div>
  )
}

export default ProductivityChart
