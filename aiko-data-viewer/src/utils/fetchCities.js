import axios from 'axios'
import equipmentPositionHistory from '../data/equipmentPositionHistory.json'

function findClosestPosition(positions, statusDate) {
  return positions.reduce((closest, position) => {
    const positionDate = new Date(position.date)
    const statusDateObj = new Date(statusDate)
    const diff = Math.abs(statusDateObj - positionDate)

    if (!closest || diff < closest.diff) {
      return { ...position, diff }
    }
    return closest
  }, null)
}

export async function fetchCityFromCoordinates(lat, lng) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    )

    const address = response.data.results[0]?.address_components
    const cityComponent = address.find((component) =>
      component.types.includes('administrative_area_level_2'),
    )
    const stateComponent = address.find((component) =>
      component.types.includes('administrative_area_level_1'),
    )

    const city = cityComponent ? cityComponent.long_name : 'Cidade Desconhecida'
    const state = stateComponent ? stateComponent.short_name : 'Desconhecido'

    return `${city} - ${state}`
  } catch (error) {
    console.error('Erro ao buscar a cidade e estado:', error)
    return 'Cidade Desconhecida - Desconhecido'
  }
}

export async function fetchCities(stateHistory, equipmentId) {
  const updatedCities = {}

  for (const state of stateHistory) {
    const positions =
      equipmentPositionHistory.find((pos) => pos.equipmentId === (equipmentId || state.equipmentId))
        ?.positions || []

    const closestPosition = findClosestPosition(positions, state.date)

    if (closestPosition) {
      const cityState = await fetchCityFromCoordinates(closestPosition.lat, closestPosition.lon)
      updatedCities[state.date] = cityState
    }
  }

  return updatedCities
}
