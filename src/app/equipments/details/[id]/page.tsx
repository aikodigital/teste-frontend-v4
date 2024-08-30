'use client'

import { useState } from 'react'
import { groupBy } from 'lodash'
import { Box, Typography } from '@mui/material'

import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentPositionHistory,
} from '@/types'
import DateNavigation from '@/components/DateNavigation'
import EquipmentDailyMap from '@/components/EquipmentDailyMap'
import StatusHistoryList from '@/components/StatusHistoryList'
import { EquipmentProvider } from '@/contexts/EquipmentContext'
import PositionHistoryList from '@/components/PositionHistoryList'
import equipmentData from '../../../../../public/data/equipment.json'
import DailyProductivitySummary from '@/components/DailyProductivitySummary'
import equipmentModelData from '../../../../../public/data/equipmentModel.json'
import equipmentStateData from '../../../../../public/data/equipmentState.json'
import equipmentStateHistoryData from '../../../../../public/data/equipmentStateHistory.json'
import equipmentPositionHistoryData from '../../../../../public/data/equipmentPositionHistory.json'

const OPERATING_STATE_ID = '0808344c-454b-4c36-89e8-d7687e692d57'
const MILLISECONDS_PER_HOUR = 60 * 60 * 1000

interface DailyProductivity {
  date: string
  productivity: number
  earnings: number
  states: EquipmentStateHistory['states']
  positions: EquipmentPositionHistory['positions']
}

export default function EquipmentDetails({
  params,
}: {
  params: { id: string }
}) {
  const equipmentId = params.id

  const stateMap = new Map<string, string>(
    (equipmentStateData as EquipmentState[]).map((state) => [
      state.id,
      state.name,
    ]),
  )

  const equipment = (equipmentData as Equipment[]).find(
    (eq) => eq.id === equipmentId,
  )

  const equipmentModel = (equipmentModelData as EquipmentModel[]).find(
    (model) => model.id === equipment?.equipmentModelId,
  )

  const equipmentHistory = (
    equipmentStateHistoryData as EquipmentStateHistory[]
  ).find((history) => history.equipmentId === equipmentId)

  const equipmentPositionHistory = (
    equipmentPositionHistoryData as EquipmentPositionHistory[]
  ).find((history) => history.equipmentId === equipmentId)

  if (
    !equipment ||
    !equipmentModel ||
    !equipmentHistory ||
    !equipmentPositionHistory
  ) {
    return <Typography>Dados do equipamento não encontrados</Typography>
  }

  const hourlyEarningsMap = new Map(
    equipmentModel.hourlyEarnings.map((earning) => [
      earning.equipmentStateId,
      earning.value,
    ]),
  )

  const calculateDailyProductivityAndEarnings = (
    states: EquipmentStateHistory['states'],
    positions: EquipmentPositionHistory['positions'],
  ): DailyProductivity[] => {
    const groupedStates = groupBy(states, (state) =>
      new Date(state.date).toDateString(),
    )
    const groupedPositions = groupBy(positions, (position) =>
      new Date(position.date).toDateString(),
    )

    return Object.entries(groupedStates).map(([date, dailyStates]) => {
      let operatingTime = 0
      let earnings = 0
      let previousStateTime = new Date(dailyStates[0].date).getTime()

      dailyStates.forEach((state, index) => {
        const currentStateTime = new Date(state.date).getTime()
        const duration =
          (currentStateTime - previousStateTime) / MILLISECONDS_PER_HOUR

        if (index > 0) {
          const previousState = dailyStates[index - 1]
          const hourlyEarning =
            hourlyEarningsMap.get(previousState.equipmentStateId) || 0
          earnings += duration * hourlyEarning

          if (previousState.equipmentStateId === OPERATING_STATE_ID) {
            operatingTime += duration
          }
        }

        previousStateTime = currentStateTime
      })

      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)
      const lastStateDuration =
        (endOfDay.getTime() - previousStateTime) / MILLISECONDS_PER_HOUR
      const lastState = dailyStates[dailyStates.length - 1]
      const lastStateHourlyEarning =
        hourlyEarningsMap.get(lastState.equipmentStateId) || 0
      earnings += lastStateDuration * lastStateHourlyEarning

      if (lastState.equipmentStateId === OPERATING_STATE_ID) {
        operatingTime += lastStateDuration
      }

      const productivity = (operatingTime / 24) * 100

      return {
        date,
        productivity,
        earnings,
        states: dailyStates,
        positions: groupedPositions[date] || [],
      }
    })
  }

  const dailyProductivityAndEarnings = calculateDailyProductivityAndEarnings(
    equipmentHistory.states,
    equipmentPositionHistory.positions,
  )

  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const currentDay = dailyProductivityAndEarnings[currentDayIndex]

  const handlePreviousDay = () => {
    setCurrentDayIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNextDay = () => {
    setCurrentDayIndex((prevIndex) =>
      Math.min(dailyProductivityAndEarnings.length - 1, prevIndex + 1),
    )
  }

  return (
    <EquipmentProvider>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          background: 'red',
        }}
      >
        <Box
          sx={{
            gap: '2rem',
            width: '40vw',
            maxWidth: '800px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F5F5F5',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: '#003380',
              padding: '2rem',
            }}
          >
            <Typography
              sx={{ fontSize: '2rem', fontWeight: 600, color: '#FFFFFF' }}
            >
              Detalhes: {equipment.name}
            </Typography>
            <Typography sx={{ fontSize: '1.4rem', color: '#EBEBEB' }}>
              {equipmentModel.name}
            </Typography>
          </Box>

          <DateNavigation
            currentDate={currentDay.date}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
            isPreviousDisabled={currentDayIndex === 0}
            isNextDisabled={
              currentDayIndex === dailyProductivityAndEarnings.length - 1
            }
          />

          <DailyProductivitySummary
            earnings={currentDay.earnings}
            productivity={currentDay.productivity}
          />

          <Box sx={{ padding: '0 2rem 2rem 2rem' }}>
            <StatusHistoryList states={currentDay.states} stateMap={stateMap} />
            <PositionHistoryList positions={currentDay.positions} />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <EquipmentDailyMap
            positions={currentDay.positions}
            equipmentModelId={equipmentModel.id}
          />
        </Box>
      </Box>
    </EquipmentProvider>
  )
}
