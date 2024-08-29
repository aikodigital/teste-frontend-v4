import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import equipment from '../../data/equipment.json' // Caminho para o arquivo JSON
import equipmentStateHistory from '../../data/equipmentStateHistory.json'
import equipmentModel from '../../data/equipmentModel.json'

// Definição de tipos
export type EquipmentModelProps = {
  id: string
  hourlyEarnings: { equipmentStateId: string; value: number }[]
}

export type EquipmentProps = {
  id: string
  name: string
  equipmentModelId: string
}

export type StateHistoryProps = {
  equipmentId: string
  states: { equipmentStateId: string; date: string }[]
}

export type EarningsDataProps = {
  name: string
  earnings: number
}

const calculateEarnings = (
  stateHistory: StateHistoryProps['states'],
  equipmentModel: EquipmentModelProps
) => {
  let earnings = 0

  stateHistory.forEach((record, index) => {
    const stateInfo = equipmentModel.hourlyEarnings.find(
      (state) => state.equipmentStateId === record.equipmentStateId
    )

    if (stateInfo) {
      const startTime = new Date(record.date)
      const endTime =
        index < stateHistory.length - 1
          ? new Date(stateHistory[index + 1].date)
          : new Date(startTime.getTime() + 24 * 60 * 60 * 1000) // Fim do dia se for o último registro

      const durationHours =
        (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
      earnings += durationHours * stateInfo.value
    } else {
      console.warn(
        `Estado ${record.equipmentStateId} não encontrado no modelo do equipamento.`
      )
    }
  })

  return earnings
}

const EarningsChart: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<any>({})
  const [chartSeries, setChartSeries] = useState<
    { name: string; data: number[] }[]
  >([
    {
      name: 'Ganho (R$)',
      data: []
    }
  ])

  useEffect(() => {
    const earningsData: EarningsDataProps[] = equipment.map(
      (eq: EquipmentProps) => {
        const equipmentModelInfo = equipmentModel.find(
          (model: EquipmentModelProps) => model.id === eq.equipmentModelId
        )
        const equipmentHistory =
          equipmentStateHistory.find(
            (hist: StateHistoryProps) => hist.equipmentId === eq.id
          )?.states || []

        const totalEarnings = calculateEarnings(
          equipmentHistory,
          equipmentModelInfo!
        )

        return {
          name: eq.name,
          earnings: totalEarnings
        }
      }
    )

    const categories = earningsData.map((data) => data.name)
    const seriesData = earningsData.map((data) => data.earnings)

    setChartOptions({
      chart: {
        type: 'bar'
      },
      colors: ['#3d1690'],
      xaxis: {
        categories: categories
      },
      title: {
        text: 'Ganho por Equipamento'
      },
      dataLabels: {
        enabled: false
      }
    })

    setChartSeries([
      {
        name: 'Ganho (R$)',
        data: seriesData
      }
    ])
  }, [])

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  )
}

export default EarningsChart
