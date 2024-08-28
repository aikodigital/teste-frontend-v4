import { EQUIPMENT_STATUS } from '@constants/states'
import { TFullState } from '@interfaces/equipmentState.interface'
import { useEquipmentLastStates } from '@query/useEquipmentLastStates'
import useFullEquipment from './useFullEquipment'

const useEquipmentGains = (id: string) => {
  const { isLoading, data } = useEquipmentLastStates(id)
  const { isLoading: isLoadingEquipment, equipment } = useFullEquipment(id)

  if (isLoading || isLoadingEquipment || !data || !equipment) {
    return {
      isLoading: true,
      data: null
    }
  }

  const stateByDates = data.reduce((acc, state) => {
    const date = String(state.date).split('T')[0]

    if (!acc[date]) {
      acc[date] = []
      acc[date].push(state)
      return acc
    }

    acc[date].push(state)
    return acc
  }, {} as { [key: string]: TFullState[] })

  const minutesWorkedPerDay = Object.entries(stateByDates).map(
    ([day, states]) => {
      const initialDay = new Date(day + 'T00:00:00.000Z')
      const oneDayLater = new Date(initialDay)
      oneDayLater.setUTCDate(initialDay.getUTCDate() + 1)
      let lastStateTime: TFullState = {
        date: oneDayLater,
        state: { color: '', id: '', name: '' }
      }

      let minutesWorking = 0
      let moneyOfDay = 0

      const modelHourlyEarnings =
        equipment.equipmentModel.hourlyEarnings.reduce((acc, e) => {
          acc[e.equipmentStateId] = e.value
          return acc
        }, {} as { [key: string]: number })

      for (const state of states) {
        switch (state.state.id) {
          case EQUIPMENT_STATUS.WORKING: {
            const date1 = new Date(lastStateTime.date)
            const date2 = new Date(state.date)

            const differenceInMs = date1.getTime() - date2.getTime()
            const differenceInMinutes = differenceInMs / (1000 * 60)

            minutesWorking += differenceInMinutes

            const dollarsMade =
              (modelHourlyEarnings[EQUIPMENT_STATUS.WORKING] / 60) *
              minutesWorking

            moneyOfDay += dollarsMade
            break
          }
          case EQUIPMENT_STATUS.MAINTAINING: {
            moneyOfDay += modelHourlyEarnings[EQUIPMENT_STATUS.MAINTAINING]
            break
          }
          case EQUIPMENT_STATUS.STOPPED: {
            moneyOfDay += modelHourlyEarnings[EQUIPMENT_STATUS.STOPPED]
            break
          }
        }

        lastStateTime = state
      }

      const hours = Math.floor(minutesWorking / 60)
      const minutes = minutesWorking % 60

      const productivity = Math.round((minutesWorking / (24 * 60)) * 100)

      return {
        day,
        minutesWorking,
        moneyOfDay: Number(moneyOfDay.toFixed(2)),
        productivity: productivity,
        hours: hours + ':' + minutes.toString().padStart(2, '0')
      }
    }
  )

  return {
    data: minutesWorkedPerDay
  }
}

export default useEquipmentGains
