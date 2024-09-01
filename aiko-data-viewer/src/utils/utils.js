import dayjs from 'dayjs'
import equipmentState from '../data/equipmentState.json'

export function mapStateIdToName() {
  return equipmentState.reduce((acc, state) => {
    acc[state.id] = state.name
    return acc
  }, {})
}

export function filterStatesByDate(states, date) {
  const formattedDate = dayjs(date).format('YYYY-MM-DD')
  return states.filter((item) => item.date.startsWith(formattedDate))
}

export function mapStatesToNames(states) {
  const idToNameMap = mapStateIdToName(equipmentState)

  return states.map((item) => ({
    ...item,
    equipmentStateId: idToNameMap[item.equipmentStateId],
  }))
}
