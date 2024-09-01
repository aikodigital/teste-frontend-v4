import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJs,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import dayjs from 'dayjs'
import {
  findEquipment,
  findEquipmentModel,
  getEquipmentEarnings,
  getEquipmentStateHistory,
} from '../utils/findEquipmentDetails'
import { filterStatesByDate, mapStatesToNames } from '../utils/utils'
import { calculateHoursDifference } from '../utils/dateUtils'
import { useState } from 'react'

import s from './Details.module.css'
import cn from 'classnames'
import { useParams } from 'react-router-dom'
import useEffectOnce from '../hooks/useEffectOnce'

ChartJs.register(Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement)
function filterStatesByDateRange(states, startDate, endDate) {
  const start = dayjs(startDate).startOf('day').subtract(3, 'hour')
  const end = dayjs(endDate).endOf('day').subtract(3, 'hour')

  return states.filter((item) => {
    const itemDate = dayjs(item.date)
    return itemDate.isBetween(start, end, null, '[]')
  })
}

function generateStateReport(id, startDate, endDate) {
  const stateHistory = getEquipmentStateHistory(id)

  const filteredStates = filterStatesByDateRange(stateHistory.states, startDate, endDate)

  const groupedStates = groupStatesByDay(filteredStates)

  const reports = Object.entries(groupedStates).map(([date, states]) => {
    const dayBefore = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD')
    const filteredDayBefore = filterStatesByDate(stateHistory.states, dayBefore)
    const filteredDayBeforeWithStateName = mapStatesToNames(filteredDayBefore)

    const lastStateDayBefore =
      filteredDayBeforeWithStateName.length > 0
        ? filteredDayBeforeWithStateName.sort((a, b) => new Date(b.date) - new Date(a.date)).at(0)
        : null

    const filteredStatesWithStateName = mapStatesToNames(states)

    return {
      date,
      report: buildStateReport(filteredStatesWithStateName, lastStateDayBefore, date),
    }
  })

  return reports
}

function groupStatesByDay(states) {
  return states.reduce((acc, state) => {
    const date = dayjs(state.date).add(3, 'hour').format('YYYY-MM-DD')
    if (!acc[date]) acc[date] = []
    acc[date].push(state)
    return acc
  }, {})
}

function buildStateReport(states, lastStateDayBefore, selectedDay) {
  states = states.sort((a, b) => new Date(a.date) - new Date(b.date))

  const startOfDay = dayjs(selectedDay).startOf('day').subtract(3, 'hour')
  const endOfDay = dayjs(selectedDay).endOf('day').subtract(3, 'hour')

  if (lastStateDayBefore) {
    if (lastStateDayBefore.equipmentStateId !== 'Operando') {
      states.unshift({
        date: startOfDay.toISOString(),
        equipmentStateId: lastStateDayBefore.equipmentStateId,
      })
    } else {
      states.unshift({
        date: startOfDay.toISOString(),
        equipmentStateId: 'Operando',
      })
    }
  } else {
    states.unshift({
      date: startOfDay.toISOString(),
      equipmentStateId: states[0].equipmentStateId,
    })
  }

  states.push({
    date: endOfDay.toISOString(),
    equipmentStateId: states[states.length - 1].equipmentStateId,
  })

  const report = states.reduce((acc, state, index) => {
    const start = dayjs(state.date)
    const end = index < states.length - 1 ? dayjs(states[index + 1].date) : endOfDay

    const duration = calculateHoursDifference(start, end)
    if (duration > 0) {
      if (acc[state.equipmentStateId]) {
        acc[state.equipmentStateId] += Math.round(duration)
      } else {
        acc[state.equipmentStateId] = Math.round(duration)
      }
    }
    return acc
  }, {})

  return Object.entries(report).map(([state, hours]) => ({ state, hours }))
}

function aggregateReportByState(reports) {
  return reports.reduce((acc, report) => {
    report.report.forEach(({ state, hours }) => {
      if (acc[state]) {
        acc[state] += hours
      } else {
        acc[state] = hours
      }
    })
    return acc
  }, {})
}

function dateFormatted(date) {
  return dayjs(date).format('DD/MM/YYYY')
}

export function Details() {
  const { id } = useParams()

  const [filters, setFilters] = useState({
    dateStart: '',
    dateEnd: '',
  })

  const equipmentName = findEquipment(id)?.name
  const equipmentModel = findEquipmentModel(id)
  const earnings = getEquipmentEarnings(equipmentModel?.id)
  const earningsWithNames = mapStatesToNames(earnings)
  const stateReport = generateStateReport(id, filters.dateStart, filters.dateEnd)
  const aggregatedReport = aggregateReportByState(stateReport)
  const totalHours = Object.values(aggregatedReport).reduce((acc, hours) => acc + hours, 0)
  const productivityPercentage = (parseFloat(aggregatedReport.Operando / totalHours) * 100).toFixed(
    2,
  )

  const dailyEarnings = stateReport.reduce((acc, curr) => {
    const totalEarnings = curr.report.reduce((sum, stateReport) => {
      const earningRate = earningsWithNames.find(
        (e) => e.equipmentStateId === stateReport.state,
      ).value
      return sum + stateReport.hours * earningRate
    }, 0)

    acc.push({ date: curr.date, earnings: totalEarnings })
    return acc
  }, [])
  const totalEarnings = dailyEarnings.reduce((acc, curr) => acc + curr.earnings, 0)

  useEffectOnce(() => {
    setFilters({
      dateStart: stateReport[0].date,
      dateEnd: stateReport[stateReport.length - 1].date,
    })
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [name]: value }
      return newFilters
    })
  }

  const pieData = {
    labels: Object.keys(aggregatedReport).map((state) => state),
    datasets: [
      {
        label: 'Produtividade',
        data: Object.values(aggregatedReport).map((hour) => hour),
        backgroundColor: ['#f1c40f', '#e74c3c', '#2ecc71'],
      },
    ],
    hoverOffset: 4,
  }

  const barData = {
    labels: dailyEarnings.map((item) => item.date),
    datasets: [
      {
        label: 'Ganho diário',
        data: dailyEarnings.map((item) => item.earnings),
        backgroundColor: ['blue'],
      },
    ],
    hoverOffset: 4,
  }

  const pieOptions = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
  }

  const barOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <div className={s.details}>
      <div className={s.container}>
        <h2 className={s.title}>{`${equipmentModel.name} (${equipmentName})`}</h2>
        <p className={s.subtitle}>
          Período: {dateFormatted(filters.dateStart)} - {dateFormatted(filters.dateEnd)}
        </p>
        <div className={s.filters}>
          <div className={s.filterWrapper}>
            <label htmlFor='dateStart'>Data Inicial</label>
            <input
              id='dateStart'
              type='date'
              name='dateStart'
              placeholder='Filtrar por data inicial'
              value={filters.dateStart}
              onChange={handleFilterChange}
            />
          </div>
          <div className={s.filterWrapper}>
            <label htmlFor='dateEnd'>Data Inicial Final</label>
            <input
              id='dateEnd'
              type='date'
              name='dateEnd'
              placeholder='Filtrar por data final'
              value={filters.dateEnd}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className={s.chartWrapper}>
          <h2>Produtividade: {productivityPercentage}%</h2>
          <div className={s.pieChartContainer}>
            <Pie key={'pie-chart'} data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className={cn(s.chartWrapper, s.barChartWrapper)}>
          <h2>Ganho Total: {totalEarnings}</h2>
          <div className={s.barChartContainer}>
            <Bar key={'bar-chart'} data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
