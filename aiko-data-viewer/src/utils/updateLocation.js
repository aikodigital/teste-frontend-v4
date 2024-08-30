import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { fetchLocations } from './fetchCities'

dayjs.extend(isBetween)

export async function updateLocation(currentItems, setLocations, dateFilter) {
  const updatedLocations = await fetchLocations(currentItems, null)

  const filteredData = updatedLocations.filter((item) => {
    const date = new Date(item.positions.date)
    return date.toISOString().startsWith(dateFilter)
  })

  const getLastPositionByEquipment = (data) => {
    return data.reduce((acc, current) => {
      const { equipmentId, positions } = current
      if (
        !acc[equipmentId] ||
        new Date(positions.date) > new Date(acc[equipmentId].positions.date)
      ) {
        acc[equipmentId] = current
      }
      return acc
    }, {})
  }

  const lastPositions = getLastPositionByEquipment(filteredData)
  const result = Object.values(lastPositions)

  setLocations(result)
}
