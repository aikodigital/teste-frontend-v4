import MapComponent from './MapComponent'
import { useEquipment } from '@/contexts/EquipmentContext'

const EquipmentMap: React.FC = () => {
  const { equipmentPositions } = useEquipment()

  return <MapComponent equipmentPositions={equipmentPositions} />
}

export default EquipmentMap
