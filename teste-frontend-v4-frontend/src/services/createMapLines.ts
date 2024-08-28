import { TPosition } from '@interfaces/equipmentPositionHistory.interface'

const createMapLines = (
  positions: TPosition[]
): { lat: number; lng: number }[] => {
  const pos = positions.map((p) => ({ lat: p.lat, lng: p.lon }))

  return pos
}

export default createMapLines
