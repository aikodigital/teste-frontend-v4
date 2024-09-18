export function getLatestPosition(
  equipmentId: string,
  positions: {
    equipmentId: string
    positions: {
      date: string
      lat: number
      lon: number
    }[]
  }[]
):
  | {
      lat: number
      lon: number
    }
  | undefined {
  const equipmentPositions = positions.find(
    (position) => position.equipmentId === equipmentId
  )

  if (!equipmentPositions) {
    return undefined
  }

  const sortedPositions = equipmentPositions.positions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const latestPosition = sortedPositions[0]

  return latestPosition
    ? { lat: latestPosition.lat, lon: latestPosition.lon }
    : undefined
}
