export type WithDate<T extends object> = T & { date: string }

type HourlyEarnings = {
  equipmentStateId: string
  value: number
}

type EquipmentModel = {
  id: string
  name: string
  hourlyEarnings: HourlyEarnings[]
}

export function useMarkerUtils() {
  function getLatestItem(items: WithDate<object>[]) {
    return items.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest
    })
  }

  function getStringDate(dateString: string) {
    const dateTime = new Date(dateString)

    const date = dateTime.toLocaleDateString('pt-BR')

    const time = dateTime.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    return `${date} ${time}`
  }

  function getIcon(model: EquipmentModel['name']) {
    switch (model) {
      case 'Caminhão de carga':
        return 'i-ph-truck-trailer-fill'
      case 'Harvester':
        return 'i-ph-tractor-fill'
      case 'Garra traçadora':
        return 'i-ph-crane-fill'
    }
  }

  return {
    getLatestItem,
    getStringDate,
    getIcon,
  }
}
