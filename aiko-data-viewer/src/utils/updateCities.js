import { fetchCities } from './fetchCities'

export async function updateCities(currentItems, setCities, previousCitiesRef) {
  const updatedCities = await fetchCities(currentItems, null)

  if (JSON.stringify(updatedCities) !== JSON.stringify(previousCitiesRef.current)) {
    setCities(updatedCities)
    previousCitiesRef.current = updatedCities
  }
}
